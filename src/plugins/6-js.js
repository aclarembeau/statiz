const uglify = require("uglify-js");
module.exports = (command, step, args) => {
  if (step === "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".js")) {
      content = uglify.minify(content).code;

      return { srcFile, content };
    }
  }
};
