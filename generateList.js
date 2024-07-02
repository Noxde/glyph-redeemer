// This file is used to generate the list of codes

const { writeFileSync } = require("fs");
const getCodes = require("./codeUpdater");

(async function () {
  const codes = await getCodes();

  let list = "";
  codes.sort((a, b) => (a.code.toLowerCase() < b.code.toLowerCase() ? -1 : 1));
  writeFileSync(
    "./config/codes.txt",
    codes.map((x) => x.code).join("\n"),
    "utf-8"
  );

  let html = ``;
  for (let i = 0; i < codes.length; i += 4) {
    let newRow = `<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=${codes[i]?.code}">
            <img width="100px" src="${codes[i].img}"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=${codes[i + 1]?.code}">
            <img width="100px" src="${codes[i + 1]?.img}"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=${codes[i + 2]?.code}">
            <img width="100px" src="${codes[i + 2]?.img}"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=${codes[i + 3]?.code}">
            <img width="100px" src="${codes[i + 3]?.img}"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${codes[i]?.code}</td>
        <td>${codes[i + 1]?.code}</td>
        <td>${codes[i + 2]?.code}</td>
        <td>${codes[i + 3]?.code}</td>
      </tr>
    </tbody>\n`;
    html += newRow;
  }

  html = html.replace(
    /<th>\s*<a href="https:\/\/warframe\.com\/promocode\?code=undefined">\s*<img width="100px" src="undefined"\/>\s*<\/a>\s*<\/th>/g,
    ""
  );
  html = html.replace(/<td>undefined<\/td>/g, "");
  html = html.replace(/\s{2,}\n\s+/g, "");

  writeFileSync("list.html", `<table>${html}</table>`, "utf-8");
})();

// LA LISTA VA ASI EN EL MARKDOWN

{
  /* <details>
  <summary>
    <h3>Glyph codes with images</h3>
  </summary>
  <TABLA>
</details> */
}
