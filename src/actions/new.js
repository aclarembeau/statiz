let fse = require("fs-extra");
module.exports = (directory) => {
  fse.copySync("sample/", directory);
};
