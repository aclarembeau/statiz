const { execSync } = require("child_process");

function version() {
  console.log("Current version:", require("../../package.json").version);
  console.log(
    "Last upgrade:",
    execSync("git log | grep Date | head -n 1 | cut -c6-").toString()
  );
}

module.exports = version;
