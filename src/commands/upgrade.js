let { execSync } = require("child_process");

module.exports = function () {
  console.log("=== Upgrading statiz code...");
  execSync("git stash; git pull -v", { cwd: __dirname });

  console.log("\n\n");
  console.log("=== Installing dependencies...");
  execSync("npm i", { cwd: __dirname });
};
