const sass = require("node-sass");

function compileSASS(data) {
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

module.exports = async (command, step, args) => {
  if (step === "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".scss")) {
      content = await compileSASS(content);
      srcFile = srcFile.replace(".scss", ".css");
    }

    return { srcFile, content };
  }
};
