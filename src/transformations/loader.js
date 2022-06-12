const glob = require("glob");
const path = require("path");

function loadTransformations(kind) {
  let files = glob
    .sync(path.join(path.resolve(__dirname), `/${kind}/*.js`))
    .sort();

  return files.map((file) => {
    return require(path.join(file.replace(".js", "")));
  });
}

module.exports = { loadTransformations };
