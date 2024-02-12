const puppeteer = require("puppeteer");
const { createSpinner } = require("nanospinner");
const { readFileSync } = require("fs");
const path = require("path");
const { addLog, readLog } = require("./logger");

const codesPath = process.pkg
  ? path.join(path.dirname(process.execPath), "config", "codes.txt")
  : path.join(__dirname, "..", "config/codes.txt");

let codes = readFileSync(codesPath, {
  encoding: "utf-8",
})
  .split("\n")
  .filter((x) => x !== "");

module.exports = async function redeemer(cookies, path) {
  if (!codes[0]) {
    throw new Error(
      "There are no codes to redeem, make sure that codes.txt is not empty"
    );
  }

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
  await page.goto("https://www.warframe.com/promocode", {
    waitUntil: "domcontentloaded",
  });
  let username = await page
    .waitForSelector(".HeaderUserProfile-nameText")
    .then((el) => el.evaluate((x) => x.textContent));

  await new Promise((resolve) => setTimeout(resolve, 250));

  if (username === "--") {
    browser.close();
    loginSpinner.error({
      text: "Failed to login into account, update your cookies and try again",
    });
    return;
  }
  loginSpinner.success({
    text: `Successfully logged in as ${username}`,
  });

  const log = readLog();
  codes = codes.filter((x) => !log.find((y) => y?.code === x));
  console.log(`Found ${codes.length} codes to redeem\n`);

  for (let code of codes) {
    console.time("It took");
    await page.waitForSelector("#promocode_input").then((e) => e.type(code));
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
    await page.reload();
  }
  await browser.close();
};
