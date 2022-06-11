let fse = require("fs-extra");
let path = require("path");
module.exports = (directory) => {
  fse.copySync(path.join(path.resolve(__dirname, "../"), "sample"), directory);
};
