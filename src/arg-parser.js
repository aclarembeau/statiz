const { ArgumentParser } = require("argparse");
const fsSync = require("fs");
const path = require("path");
const fs = require("fs/promises");

async function parseArguments() {
  const parser = new ArgumentParser({
    description: "Your simple static website generator",
  });

  parser.add_argument("action", { help: "build/serve" });
  parser.add_argument("directory");

  const { action, directory } = parser.parse_args();

  return { action, directory };
}

module.exports = { parseArguments };
