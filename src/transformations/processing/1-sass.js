const sass = require("node-sass");
const path = require("path");

function compileSASS(baseDir, data) {
  let dependencies = new Set();
  return new Promise((resolve, reject) => {
    sass.render(
      {
        data: data.toString(),
        importer: (url, prev, done) => {
          url = path.join(baseDir, url);
          dependencies.add(url + ".scss");
          done({
            file: url,
          });
        },
      },
      (err, result) => {
        if (err) reject(err);
        if (result) resolve([result.css.toString(), dependencies]);
      }
    );
  });
}

module.exports = async (command, args) => {
  let { srcFile, content } = args;
  if (srcFile.endsWith(".scss")) {
    let [css, dependencies] = await compileSASS(path.dirname(srcFile), content);
    content = css;
    srcFile = srcFile.replace(".scss", ".css");

    return { srcFile, content, dependencies };
  }
};
