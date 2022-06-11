let fse = require("fs-extra");
let path = require("path");
module.exports = (directory) => {
  console.log(__dirname);
  fse.copySync(
    path.join(path.basename(path.resolve(__dirname)), "sample"),
    directory
  );
};
