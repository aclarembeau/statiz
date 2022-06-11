const uglify = require("uglify-js");
module.exports = (action, args) => {
  if (action == "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".css")) {
      var CleanCSS = require("clean-css");

      content = new CleanCSS({}).minify(content).styles.toString();

      return { srcFile, content };
    }
  }
};
