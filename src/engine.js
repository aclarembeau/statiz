const fs = require("fs/promises");
const path = require("path");
const fsSync = require("fs");
const { differenceInMilliseconds } = require("date-fns");

const transformFile = async (
  command,
  srcDir,
  srcFile,
  distDir,
  transformations
) => {
  if (
    !fsSync.existsSync(srcFile) ||
    fsSync.lstatSync(srcFile).isDirectory() ||
    srcFile.includes(distDir) ||
    path.basename(srcFile).startsWith("_")
  ) {
    return;
  }

  let t0 = new Date();

  console.log("Start building", "\t\t", srcFile);

  let dependencies = new Set();

  let content = await fs.readFile(srcFile);

  try {
    for (let transform of transformations) {
      let result = await transform(command, { srcFile, content });
      if (result) {
        srcFile = result.srcFile;
        content = result.content;

        dependencies = new Set([
          ...dependencies,
          ...(result.dependencies || []),
        ]);
      }
    }
  } catch (e) {
    console.error("Cannot compile: ", srcFile);
    console.error(e);
  }

  srcFile = path.join(distDir, path.relative(srcDir, srcFile));

  await fs.mkdir(path.dirname(srcFile), { recursive: true });
  await fs.writeFile(srcFile, content);

  console.log(
    "Done building",
    "\t\t",
    srcFile,
    "\t\t",
    differenceInMilliseconds(new Date(), t0),
    "ms"
  );
  return dependencies;
};

let transformFiles = async (
  command,
  transformations,
  files,
  parentDependencies
) => {
  let promises = [];
  for (let file of files) {
    promises.push(
      (async () => {
        let dependencies = await transformFile(
          command,
          "./",
          file,
          "dist",
          transformations
        );
        for (let dep of dependencies || []) {
          if (!parentDependencies[dep]) parentDependencies[dep] = new Set();
          parentDependencies[dep].add(file);
        }
      })()
    );
  }

  await Promise.all(promises);
};

module.exports = { transformFiles };
