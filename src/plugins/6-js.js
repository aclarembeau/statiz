module.exports = (action, args) => {
  if (action == "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".js")) {
      const uglify = require("uglify-js");
      const result = uglify.minify(content).code;

      content = result;
      return { srcFile, content };
    }
  }
};
