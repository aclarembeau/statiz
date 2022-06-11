let fse = require("fs-extra");
let path = require("path");
module.exports = (directory) => {
  console.log(path.resolve(__dirname));
  console.log(path.basename(path.resolve(__dirname)));
  fse.copySync(
    path.join(path.basename(path.resolve(__dirname)), "sample"),
    directory
  );
};
