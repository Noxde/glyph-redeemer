const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

/**
 * Thanks voltage for updating the list of codes
 * Link to his profile on the warframe forums https://forums.warframe.com/profile/1419671-voltage/
 */
module.exports = async function getCodes(debuggingPort) {
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${debuggingPort}`,
  });

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
