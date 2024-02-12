const redeemer = require("./redeemer.js");
const { installChromium, removeChromium } = require("./installer.js");
const path = require("path");
const { createSpinner } = require("nanospinner");
const readline = require("readline");
const { VTexec } = require("open-term");

// If its not windows and not running on a terminal then exit
if (!process.stdout.isTTY && !process.env.APPDATA) {
  VTexec("echo 'Please run the script from the terminal.'");
  process.exit(1);
}

const cookiesPath = process.pkg
  ? path.join(path.dirname(process.execPath), "config", "cookies.json")
  : "../config/cookies.json";

(async function () {
  let cookies;
  try {
    cookies = require(cookiesPath);
  } catch (err) {
    console.error(
      "Could not find the cookies file make sure its in the config folder and the file is not empty."
    );
    if (process.env.APPDATA) {
      return readline
        .createInterface({
          input: process.stdin,
          output: process.stdout,
        })
        .question("Press enter to close the program...", (ans) =>
          process.exit(0)
        );
    }
    process.exit(0);
  }

  const chromiumSpinner = createSpinner("Installing chromium").start();
  const chromiumPath = await installChromium();
  chromiumSpinner.success({
    text: "Chromium installed",
  });

  console.time("No codes left to redeem. Time taken");
  await redeemer(cookies, chromiumPath);
  console.timeEnd("No codes left to redeem. Time taken");

  await removeChromium();

  if (process.platform === "win32") {
    readline
      .createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      .question("Press enter to close the program...", (ans) =>
        process.exit(1)
      );
  }
})();
