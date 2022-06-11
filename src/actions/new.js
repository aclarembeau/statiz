let fse = require("fs-extra");
let fs = require("fs");
let path = require("path");
module.exports = (directory) => {
  if (fs.existsSync(directory)) {
    console.error("Cannot start on a existing directory: ", directory);
    return;
  }
  fse.copySync(
    path.join(path.resolve(__dirname, "../../"), "sample"),
    directory
  );
};
