const uglify = require("uglify-js");
module.exports = (command, args) => {
  let { srcFile, content } = args;
  if (srcFile.endsWith(".js")) {
    content = uglify.minify(content).code;

    return { srcFile, content };
  }
};
