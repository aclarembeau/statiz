let fse = require("fs-extra");
let path = require("path");
module.exports = (directory) => {
  console.log(__dirname);
  fse.copySync(path.relative(__dirname, "sample/"), directory);
};
