const glob = require("glob");
const path = require("path");
let fs = require("fs/promises");
let fsSync = require("fs");
module.exports = async (baseAction, command, args) => {
  if (command == "postprocessing") {
    let { src, dist } = args;

    if (!fsSync.exists(path.join(src, "config.json"))) {
      console.error("Your sources should have a root config.json repository");
      return;
    }

    let { host } = JSON.parse(await fs.readFile(path.join(src, "config.json")));

    if (!host) {
      console.error("Missing host configuration in config.json");
      return;
    }

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
