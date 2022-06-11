const glob = require("glob");
const path = require("path");
let fs = require("fs/promises");
module.exports = async (baseAction, command, args) => {
  if (command == "postprocessing") {
    let { src, dist } = args;

    let { host } = JSON.parse(await fs.readFile(path.join(src, "config.json")));

    let entries = glob
      .sync(dist + "/**/*")
      .filter((x) => x.endsWith(".html"))
      .map((f) => {
        return `<url><loc>${host}/${path.relative(dist, f)}</loc></url>`;
      });

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

    await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
  }
};
