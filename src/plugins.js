const glob = require("glob");
const path = require("path");

function loadPlugins() {
  let files = glob
    .sync(path.join(path.resolve(__dirname), "plugins/*.js"))
    .sort();
  return files.map((file) => {
    return require("../" + file.replace(".js", ""));
  });
}

module.exports = { loadPlugins };
