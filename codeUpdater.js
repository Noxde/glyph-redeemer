const cheerio = require("cheerio");

/**
 * Thanks voltage for updating the list of codes
 * Link to his profile on the warframe forums https://forums.warframe.com/profile/1419671-voltage/
 */
module.exports = function getCodes() {
  const codes = fetch(
    "https://forums.warframe.com/topic/992008-free-promocodes-and-glyphs-all-platforms/"
  )
    .then((res) => res.text())
    .then((data) => {
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

      return jsonCodes.get();
    });

  return codes;
};
