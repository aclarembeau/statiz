const glob = require("glob");
require("path");
const { differenceInMilliseconds } = require("date-fns");

const { handleFile } = require("../engine");
const { loadPlugins } = require("../plugin-loader");
const fs = require("fs/promises");
require("fs");

module.exports = async function () {
  const dist = "./dist";
  await fs.mkdir(dist, { recursive: true });

  const files = glob.sync("**/*");

  console.log("Loading plugins");
  let plugins = loadPlugins();

  let t0 = new Date();
  let promises = [];

  for (const file of files) {
    promises.push(handleFile("build", "./", file, dist, plugins));
  }

  await Promise.all(promises);

  for (let plugin of plugins) {
    await plugin("build", "postprocessing", { src: "./", dist: dist });
  }

  console.log("");
  console.log("Elapsed time: ", differenceInMilliseconds(new Date(), t0), "ms");
};
