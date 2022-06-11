const ejs = require("ejs");

module.exports = async (command, step, args) => {
  if (step === "build") {
    let { srcFile, content } = args;

    if (srcFile.endsWith(".ejs")) {
      content = await ejs.render(
        content,
        {},
        {
          async: true,
          includer: (originalPath, parsedPath) => {
            return { filename: originalPath };
          },
        }
      );
    }

    srcFile = srcFile.replace(".ejs", ".html");

    return { srcFile, content };
  }
};
