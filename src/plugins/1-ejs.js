const fs = require("fs/promises");

module.exports = (action, args) => {
  if (action == "build") {
    let { srcFile, content } = args;

    return { srcFile, content };
  }
};
