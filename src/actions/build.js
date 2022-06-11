const glob = require("glob");
const path = require("path");
const { differenceInMilliseconds } = require("date-fns");

const { buildFile } = require("../build");
const { loadPlugins } = require("../plugins");
const fs = require("fs/promises");
const fsSync = require("fs");

async function actionBuild(source) {
  if (!fsSync.existsSync(directory)) {
    console.error("Source directory does not exist:", source);
    return;
  }

  const dist = path.join(source, "dist");
  await fs.mkdir(dist, { recursive: true });

  const files = glob.sync(path.join(source, "**/*"));

  console.log("Loading plugins");
  let plugins = loadPlugins();

  let t0 = new Date();
  let promises = [];

  for (const file of files) {
    if (!file.includes(dist))
      promises.push(buildFile(source, file, dist, plugins));
  }

  await Promise.all(promises);

  console.log("");
  console.log("Elapsed time: ", differenceInMilliseconds(new Date(), t0), "ms");
}

module.exports = actionBuild;
