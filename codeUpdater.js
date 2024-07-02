const cheerio = require("cheerio");
const axios = require("axios").default;

/**
 * Thanks voltage for updating the list of codes
 * Link to his profile on the warframe forums https://forums.warframe.com/profile/1419671-voltage/
 */
module.exports = async function getCodes() {
  const { data } = await axios.get(
    "https://forums.warframe.com/topic/992008-free-promocodes-and-glyphs-all-platforms/"
  );

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
