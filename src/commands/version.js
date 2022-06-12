const { execSync } = require("child_process");

module.exports = function () {
  console.log(require("../../package.json").version);
};
