const fs = require("fs/promises");
const path = require("path");

const handleFile = async (baseAction, srcDir, srcFile, distDir, plugins) => {
  console.log("Building", srcFile);

  let content = (await fs.readFile(srcFile)).toString();

  srcFile = path.join(distDir, path.relative(srcDir, srcFile));

  for (let plugin of plugins) {
    let result = await plugin(baseAction, "build", { srcFile, content });
    if (result) {
      srcFile = result.srcFile;
      content = result.content;
    }
  }

  await fs.writeFile(srcFile, content);
  console.log("Finished", srcFile);
};

module.exports = { handleFile };
