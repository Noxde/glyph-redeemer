const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const {logError} = require("./src/logger");
const {getConfig} = require("./src/config");
const { createSpinner } = require("nanospinner");

/**
 * Thanks voltage for updating the list of codes
 * Link to his profile on the warframe forums https://forums.warframe.com/profile/1419671-voltage/
 */
module.exports = async function getCodes() {
  let config = getConfig();
  let browser;
  const codesSpinner = createSpinner();

  const maxRetries = config.BrowserMaxConnectionTries;
  const retryDelayMs = config.BrowserWaitBetweenTriesMs;

  for (let i = 0; i < maxRetries; i++) {
    try {
      codesSpinner.start({
        text: `Attempting to connect to browser (Attempt ${i + 1})`,
      });
      browser = await puppeteer.connect({
        browserURL: `http://127.0.0.1:${config.DebuggingPort}`,
      });
      codesSpinner.success({
        text: `Successfully connected to browser after ${i + 1} attempts.`,
      });      
      
      break; // Exit the loop if connection is successful
    } catch (error) {
      // console.warn(`Failed to connect to browser: ${error.message}`);
      if (i < maxRetries - 1) { // If it's not the last attempt
        codesSpinner.update({
          text: `Retrying in ${retryDelayMs / 1000} seconds...`,
        });
        await new Promise(resolve => setTimeout(resolve, retryDelayMs));
      } else {
        // If it's the last attempt
        codesSpinner.error({
          text: `Failed to connect to browser after ${i + 1} attempts`,
        });
        logError(`Failed to connect to browser after ${i + 1} attempts: ${error.message}`);
        throw new Error(`Failed to connect to browser after ${i + 1} attempts: ${error.message}`);
      }
    }
  }

  const [page] = await browser.pages();
  await page.goto(
    "https://forums.warframe.com/topic/992008-free-promocodes-and-content-creator-glyphs/",
    {
      waitUntil: "networkidle0",
    }
  );

  const data = await page.content();
  browser.disconnect();

  const $ = cheerio.load(data);
  const table = $(".ipsSpoiler_contents").first();
  const codes = table.find("ol > li");
  const jsonCodes = codes.map((_, el) => {
    const element = $(el);
    return {
      code: element.find("a").first().text().trim(),
      img: element.find("img").attr("src"),
    };
  });

  return jsonCodes.toArray();
};
