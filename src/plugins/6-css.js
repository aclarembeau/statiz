const uglify = require("uglify-js");
module.exports = (baseAction, command, args) => {
  if (command == "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".css")) {
      var CleanCSS = require("clean-css");

      content = new CleanCSS({}).minify(content).styles.toString();

      return { srcFile, content };
    }
  }
};
