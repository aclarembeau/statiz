const fs = require("fs/promises");

module.exports = (baseAction, command, args) => {
  if (command == "build") {
    let { srcFile, content } = args;

    return { srcFile, content };
  }
};
