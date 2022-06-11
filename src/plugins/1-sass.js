const sass = require("node-sass");

function sassASync(data) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        data: data,
      },
      (err, result) => {
        if (err) reject(err);
        if (result) resolve(result.css.toString());
      }
    );
  });
}

module.exports = async (baseAction, command, args) => {
  if (command == "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".scss")) {
      content = await sassASync(content);
      srcFile = srcFile.replace(".scss", ".css");
    }

    return { srcFile, content };
  }
};
