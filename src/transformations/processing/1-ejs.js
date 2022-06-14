const ejs = require("ejs");
const path = require("path");

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
          let url = path.join(path.dirname(srcFile), originalPath);

          dependencies.add(url);
          return { filename: url };
        },
      }
    );

    srcFile = srcFile.replace(".ejs", ".html");
    return { srcFile, content, dependencies };
  }
};
