const ejs = require("ejs");

module.exports = async (command, args) => {
  let { srcFile, content } = args;

  let dependencies = new Set();

  if (srcFile.endsWith(".ejs")) {
    content = await ejs.render(
      content.toString(),
      {},
      {
        async: true,
        includer: (originalPath, parsedPath) => {
          dependencies.add(originalPath);
          return { filename: originalPath };
        },
      }
    );

    srcFile = srcFile.replace(".ejs", ".html");
    return { srcFile, content, dependencies };
  }
};
