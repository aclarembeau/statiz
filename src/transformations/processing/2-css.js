const CleanCSS = require("clean-css");
module.exports = (command, args) => {
  let { srcFile, content } = args;
  if (srcFile.endsWith(".css")) {
    content = new CleanCSS({}).minify(content).styles.toString();

    return { srcFile, content };
  }
};
