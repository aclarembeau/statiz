const glob = require("glob");
require("path");
const { differenceInMilliseconds } = require("date-fns");

const { transformFile, transformFiles } = require("../engine");
const { loadTransformations } = require("../transformations/loader");
const fs = require("fs/promises");

module.exports = async function () {
  console.log("Builing for production\n\n");

  // Initialization
  await fs.mkdir("dist", { recursive: true });
  let processingTransformations = loadTransformations("processing");
  const files = glob.sync("**/*");

  let t0 = new Date();

  // Processing
  await transformFiles("build", processingTransformations, files, new Set());

  // Postprocessing
  for (let transform of loadTransformations("postprocessing")) {
    await transform("build", { src: "./", dist: "dist" });
  }

  console.log(
    "\n\nTotal time:",
    differenceInMilliseconds(new Date(), t0),
    "ms"
  );
};
