const puppeteer = require("puppeteer");
const { createSpinner } = require("nanospinner");
const { readFileSync } = require("fs");
const path = require("path");

const codesPath = process.pkg
  ? path.join(path.dirname(process.execPath), "config", "codes.txt")
  : path.join(__dirname, "..", "config/codes.txt");

let codes = readFileSync(codesPath, {
  encoding: "utf-8",
})
  .split("\n")
  .filter((x) => x !== "");

module.exports = async function redeemer(path, cookies) {
  if (!codes[0]) {
    throw new Error(
      "There are no codes to redeem, make sure that codes.txt is not empty"
    );
  }

  cookies = cookies.map((x) => {
    if (x.partitionKey === null) {
      x.partitionKey = ""; // Fix partition key for puppeteer
    }
    if (x.sameSite === null) {
      x.sameSite = ""; // Fix sameSite for puppeteer
    }
    return x;
  });

  const loginSpinner = createSpinner("Trying to login").start();
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: path,
  });
  const [page] = await browser.pages();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.setCookie(...cookies);
  await page.goto("https://www.warframe.com/");

  await page.setRequestInterception(true);

  page.on("request", (req) => {
    if (
      req.resourceType() == "font" ||
      req.resourceType() == "image" ||
      req.resourceType() == "stylesheet"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  let username = await page
    .waitForSelector(".HeaderUserProfile-nameText")
    .then((el) => el.evaluate((x) => x.textContent));

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

  for (let code of codes) {
    await page.goto("https://www.warframe.com/promocode");
    let codeSpinner = createSpinner(`Trying to redeem ${code}`).start();

    await page.waitForSelector("#promocode_input").then((e) => e.type(code));
    await Promise.all([
      page.waitForNavigation({
        waitUntil: "domcontentloaded",
        timeout: 60_000,
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
      let message = await page.$eval(
        ".alert-danger li",
        (el) => el.textContent
      );

      codeSpinner.error({
        text: message.includes("you already redeemed a code")
          ? `Already claimed ${code}`
          : `Failed to redeem ${code}\n`,
      });
    }

    console.log(`${codes.length - 1} Codes remaining\n`);

    codes = codes.filter((x) => x !== code);
  }
  await browser.close();
};
