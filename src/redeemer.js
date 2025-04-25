const puppeteer = require("puppeteer");
const { createSpinner } = require("nanospinner");
const { logCode, logError } = require("./logger");
const exitProgram = require("./exitProgram");
const { redeemed, invalid, invalidRedeemed, captcha } = require("./errors");

module.exports = async function redeemer(codes, cookies, debuggingPort) {
  const loginSpinner = createSpinner("Trying to login").start();
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${debuggingPort}`,
  });

  process.on("SIGINT", async () => {
    console.log("Closing browser");
    await browser.close();
    console.log("Exiting");
    process.exit(0);
  });

  if (!cookies.length)
    throw Error(
      "Cookies should be an array, make sure you are pasting Warframe's site cookies in cookies.json"
    );

  cookies = cookies
    .map((x) => {
      delete x?.partitionKey;
      delete x?.sameSite;
      return x;
    })
    .filter((x) => x.name !== "language"); // Remove the language cookie to only get errors in english

  const [page] = await browser.pages();

  await page.setCookie(...cookies);

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
  let codesTried = 0;

  for (let code of codes) {
    console.time("It took");
    await page.goto(`https://www.warframe.com/promocode`);
    let codeSpinner = createSpinner(`Trying to redeem ${code}`).start();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.type("#promoCode-input", code);

    await Promise.all([
      page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: 20_000,
      }),
      page.click("#promoCode-submit"),
    ]);
    codesTried++;

    let successContainer = await page.$("#modal");

    if (successContainer) {
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
          "\nThere were 5 captchas, please try to use the program again later"
        );
        return exitProgram(browser);
      }
    }

    console.timeEnd("It took");
    console.log(`${codes.length - 1} Codes remaining\n`);
    codes = codes.filter((x) => x !== code);

    if (codesTried % 10 === 0) {
      console.log("Waiting 10 seconds to continue.");
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      continue;
    }

    console.log(`Trying next code in 5 seconds.`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  await browser.close();
};
