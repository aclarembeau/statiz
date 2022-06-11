module.exports = (baseAction, command, args) => {
  if (command == "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".js")) {
      const uglify = require("uglify-js");
      const result = uglify.minify(content).code;

      content = result;
      return { srcFile, content };
    }
  }
};
