const CleanCSS = require("clean-css");
module.exports = (command, step, args) => {
  if (step === "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".css")) {
      content = new CleanCSS({}).minify(content).styles.toString();

      return { srcFile, content };
    }
  }
};
