const glob = require("glob");
const path = require("path");
let fs = require("fs/promises");
let fsSync = require("fs");
const prompt = require("prompt-sync")();

module.exports = async (command, args) => {
  let { src, dist } = args;

  let host;
  if (!fsSync.existsSync(path.join(src, "hostname"))) {
    console.log("\n\n");
    console.log("You should define a hostname");
    host = prompt("hostname: ");
    await fs.writeFile("hostname", host);
    console.log("Done!\n");
  } else {
    await fs.readFile(path.join(src, "hostname"));
  }

  let entries = glob
    .sync(dist + "/**/*")
    .filter((x) => x.endsWith(".html"))
    .map((f) => {
      return `<url><loc>${host}/${path.relative(dist, f)}</loc></url>`;
    });

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  sitemap += entries.join("\n");
  sitemap += `</urlset>`;

  await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
};
