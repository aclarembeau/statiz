const glob = require("glob");
const path = require("path");

/**
 * Load the requested transformations
 * @param kind (processing / postprocessing)
 * @returns transformation functions
 */
function loadTransformations(kind) {
  let files = glob
    .sync(path.join(path.resolve(__dirname), `/${kind}/*.js`))
    .sort();

  return files.map((file) => {
    return require(path.join(file.replace(".js", "")));
  });
}

module.exports = { loadTransformations };
