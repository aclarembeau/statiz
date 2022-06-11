let fse = require("fs-extra");
let fs = require("fs");
let path = require("path");
module.exports = () => {
  if (process.argv.length < 3) {
    console.error("Please indicate a directory");
  }

  let directory = process.argv[2];

  if (fs.existsSync(directory)) {
    console.error("Cannot start on a existing directory: ", directory);
    return;
  }
  fse.copySync(
    path.join(path.resolve(__dirname, "../../"), "sample"),
    directory
  );
};
