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

  if (!cookies.length)
    throw Error(
      "Cookies should be an array, make sure you are pasting Warframe's site cookies in cookies.json"
    );

  cookies = cookies
    .map((x) => {
      if (x.partitionKey === null) {
        x.partitionKey = ""; // Fix partition key for puppeteer
      }
      if (x.sameSite === null) {
        x.sameSite = ""; // Fix sameSite for puppeteer
      }
      return x;
    })
    .filter((x) => x.name !== "language"); // Remove the language cookie to only get errors in english

  const [page] = await browser.pages();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
  );
  await page.setViewport({
    height: 1080,
    width: 1920,
  });

  await page.setCookie(...cookies);

  // await page.setExtraHTTPHeaders({ DNT: "1" });
  // await page.setRequestInterception(true);
  // page.on("request", (req) => {
  //   if (
  //     req.resourceType() == "font" ||
  //     req.resourceType() == "image" ||
  //     req.resourceType() == "stylesheet" ||
  //     req.resourceType() == "media"
  //   ) {
  //     req.abort();
  //   } else {
  //     req.continue();
  //   }
  // });
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

  let captchaFails = 0;

  for (let code of codes) {
    console.time("It took");
    await page.goto(`https://www.warframe.com/promocode?code=${code}`);
    let codeSpinner = createSpinner(`Trying to redeem ${code}`).start();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await Promise.all([
      page.waitForNavigation({
        waitUntil: "networkidle0",
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
      logCode(code, `Claimed now`);
    } else {
      let alert = await page.waitForSelector(".alert-danger li");
      let message = await alert.evaluate((el) => el.textContent);
      message = message.toLowerCase();

      switch (message) {
        case redeemed:
        // fall through
        case invalidRedeemed:
          codeSpinner.error({
            text: `Already claimed ${code}`,
          });
          logCode(code, "Already claimed");
          break;
        case invalid:
          codeSpinner.error({
            text: `Failed to redeem ${code}`,
          });
          logError(
            `Failed to redeem ${code}: possibly non existent or expired code`
          );
          break;
        case captcha:
          codeSpinner.error({
            text: "Captcha failed",
          });
          logError(message);
          captchaFails += 1;
          break;
        default:
          codeSpinner.error({
            text: "An error ocurred",
          });
          logError(message);
      }

      if (captchaFails > 5) {
        console.log(
          "\nThere were 5 captchas, please try to use the program later"
        );
        return exitProgram();
      }
    }

    console.timeEnd("It took");
    console.log(`${codes.length - 1} Codes remaining\n`);

    codes = codes.filter((x) => x !== code);
    console.log("Trying next code in 1 second.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  await browser.close();
};
