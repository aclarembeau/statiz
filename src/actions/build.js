const glob = require("glob");
const path = require("path");
const { differenceInMilliseconds } = require("date-fns");

const { handleFile } = require("../engine");
const { loadPlugins } = require("../plugin-loader");
const fs = require("fs/promises");
const fsSync = require("fs");

async function actionBuild() {
  const dist = "./dist";
  await fs.mkdir(dist, { recursive: true });

  const files = glob.sync("**/*");

  console.log("Loading plugins");
  let plugins = loadPlugins();

  let t0 = new Date();
  let promises = [];

  for (const file of files) {
    if (!file.includes(dist))
      promises.push(handleFile("build", "./", file, dist, plugins));
  }

  await Promise.all(promises);

  for (let plugin of plugins) {
    await plugin("build", "postprocessing", { src: "./", dist: dist });
  }

  console.log("");
  console.log("Elapsed time: ", differenceInMilliseconds(new Date(), t0), "ms");
}

module.exports = actionBuild;
