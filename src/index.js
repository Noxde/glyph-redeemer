const redeemer = require("./redeemer.js");
const { installChromium, removeChromium } = require("./installer.js");
const path = require("path");
const { createSpinner } = require("nanospinner");
const readline = require("readline");
const { VTexec } = require("open-term");
const { isLatest, update } = require("./updater.js");

const version = "1.2.1"; // Lower version number for testing purposes this is actually 1.2.3 with changes
// If its not windows and not running on a terminal then exit
if (!process.stdout.isTTY && !process.env.APPDATA) {
  VTexec("echo 'Please run the script from the terminal.'");
  process.exit(1);
}

const cookiesPath = process.pkg
  ? path.join(path.dirname(process.execPath), "config", "cookies.json")
  : "../config/cookies.json";

(async function () {
  const isUpdated = await isLatest(version);

  if (!isUpdated.isLatest) {
    await update(isUpdated.assets);
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
