const fs = require("fs/promises");
const path = require("path");
const fsSync = require("fs");

const handleFile = async (baseAction, srcDir, srcFile, distDir, plugins) => {
  if (
    !fsSync.existsSync(srcFile) ||
    fsSync.lstatSync(srcFile).isDirectory() ||
    srcFile.includes(distDir) ||
    path.basename(srcFile).startsWith("_")
  ) {
    return;
  }

  console.log("Starting", srcFile);

  let content = (await fs.readFile(srcFile)).toString();

  srcFile = path.join(distDir, path.relative(srcDir, srcFile));

  for (let plugin of plugins) {
    let result = await plugin(baseAction, "build", { srcFile, content });
    if (result) {
      srcFile = result.srcFile;
      content = result.content;
    }
  }

  await fs.mkdir(path.dirname(srcFile), { recursive: true });
  await fs.writeFile(srcFile, content);
  console.log("Finished", srcFile);
};

module.exports = { handleFile };
