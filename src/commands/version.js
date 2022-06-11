const { execSync } = require("child_process");

module.exports = function () {
  console.log("Current version:", require("../../package.json").version);
  console.log(
    "Last upgrade:",
    execSync("git log | grep Date | head -n 1 | cut -c6-").toString()
  );
};
