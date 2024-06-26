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

  await page.setCookie(...cookies);

  await page.setExtraHTTPHeaders({ DNT: "1" });
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

  let total = codes.length;
  let codesTried = 0;
  let amount = 1;
  let captchaFails = 0;

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
          console.log(message);
          codeSpinner.error({
            text: "An error ocurred, if you are using a vpn try to disable it before using this",
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
    // Incremental cooldown each quarter of the codes to avoid rate limit; Looks like it works. It might be possible to reduce the cooldown
    if (total > 100 && codesTried == Math.floor(total / 4)) {
      let cooldown = 1 * amount;
      codesTried = 0;
      console.log(`Waiting ${cooldown} minute to avoid rate limit.`);
      amount++;
      await new Promise((resolve) => setTimeout(resolve, cooldown * 60 * 1000));
    } else {
      console.log("Trying next code in 3 seconds.");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      codesTried++;
    }
  }
  await browser.close();
};
