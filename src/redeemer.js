const puppeteer = require("puppeteer");
const { createSpinner } = require("nanospinner");
const { logCode, logError } = require("./logger");
const exitProgram = require("./exitProgram");
const { redeemed, invalid, invalidRedeemed, captcha } = require("./errors");

module.exports = async function redeemer(codes, cookies, path) {
  const loginSpinner = createSpinner("Trying to login").start();
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: path,
  });

  cookies = cookies.map((x) => {
    if (x.partitionKey === null) {
      x.partitionKey = ""; // Fix partition key for puppeteer
    }
    if (x.sameSite === null) {
      x.sameSite = ""; // Fix sameSite for puppeteer
    }
    return x;
  });

  const [page] = await browser.pages();
  await page.setExtraHTTPHeaders({ DNT: "1" });

  await page.setCookie(...cookies);
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    if (
      req.resourceType() == "font" ||
      req.resourceType() == "image" ||
      req.resourceType() == "stylesheet" ||
      req.resourceType() == "media"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  await page.goto("https://www.warframe.com/", {
    waitUntil: "domcontentloaded",
  });

  // Wait for the username to show up, if it doesnt in 15 seconds it failed to login
  await page
    .waitForFunction(
      () =>
        document.querySelector(".HeaderUserProfile-nameText").innerText !==
        "--",
      {
        timeout: 15_000,
      }
    )
    .catch(async () => {
      loginSpinner.error({
        text: "Failed to login into account, update your cookies and try again",
      });
      await exitProgram();
    });

  let username = await page.$eval(
    ".HeaderUserProfile-nameText",
    (el) => el.textContent
  );

  loginSpinner.success({
    text: `Successfully logged in as ${username}`,
  });

  const log = readLog();
  codes = codes
    .map((x) => x.code)
    .filter((x) => !log.find((y) => y?.code === x));
  console.log(`Found ${codes.length} new codes to redeem\n`);

  for (let code of codes) {
    console.time("It took");
    await page.goto(`https://www.warframe.com/promocode?code=${code}`);
    let codeSpinner = createSpinner(`Trying to redeem ${code}`).start();

    await Promise.all([
      page.waitForNavigation({
        waitUntil: "domcontentloaded",
        timeout: 20_000,
      }),
      page.click("#btnSubmit"),
    ]);

    let successContainer = await page.waitForSelector("#basicTextContain");
    let isSuccess = await successContainer.evaluate((e) =>
      e.textContent.includes("Thanks for redeeming your code!")
    );

    if (isSuccess) {
      codeSpinner.success({
        text: `${code} redeemed successfully\n`,
      });
    } else {
      let alert = await page.waitForSelector(".alert-danger li");
      let message = await alert.evaluate((el) => el.textContent);

      if (message.includes("you already redeemed a code")) {
        codeSpinner.error({
          text: `Already claimed ${code}`,
        });
        addLog(code, "Already claimed");
      } else {
        codeSpinner.error({
          text: `Failed to redeem ${code}`,
        });
        addLog(code, "Failed to redeem possibly non existent or expired code");
      }
    }

    console.timeEnd("It took");
    console.log(`${codes.length - 1} Codes remaining\n`);

    codes = codes.filter((x) => x !== code);
    console.log("Trying next code in 3 seconds.");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  await browser.close();
};
