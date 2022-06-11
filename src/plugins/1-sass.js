const sass = require("node-sass");

function sassASync(data) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        data: data,
      },
      (err, result) => {
        console.error(err);

        if (err) reject(err);
        if (result) resolve(result.css.toString());
      }
    );
  });
}

module.exports = async (action, args) => {
  if (action == "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".scss")) {
      content = await sassASync(content);
      srcFile = srcFile.replace(".scss", ".css");
    }

    return { srcFile, content };
  }
};
