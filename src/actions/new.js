let fse = require("fs-extra");
let path = require("path");
module.exports = (directory) => {
  fse.copySync(path.relative(__dirname, "sample/"), directory);
};
