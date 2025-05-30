const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const {logError} = require("./src/logger");
const {getConfig} = require("./src/config");

/**
 * Thanks voltage for updating the list of codes
 * Link to his profile on the warframe forums https://forums.warframe.com/profile/1419671-voltage/
 */
module.exports = async function getCodes() {
  let config = getConfig();
  let browser;
  const maxRetries = config.BrowserMaxConnectionTries;
  const retryDelayMs = config.BrowserWaitBetweenTriesMs;

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Attempting to connect to browser (Attempt ${i})...`);
      browser = await puppeteer.connect({
        browserURL: `http://127.0.0.1:${config.DebuggingPort}`,
      });
      console.log(`Successfully connected to browser after ${i}.`);
      break; // Exit the loop if connection is successful
    } catch (error) {
      // console.warn(`Failed to connect to browser: ${error.message}`);
      if (i < maxRetries - 1) { // If it's not the last attempt
        console.log(`Retrying in ${retryDelayMs / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelayMs));
      } else {
        // If it's the last attempt
        logError(`Failed to connect to browser after ${i} attempts: ${error.message}`);
        throw new Error(`Failed to connect to browser after ${i} attempts: ${error.message}`);
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
