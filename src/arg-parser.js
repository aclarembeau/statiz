const { ArgumentParser } = require("argparse");
const fsSync = require("fs");
const path = require("path");
const fs = require("fs/promises");

async function parseArguments() {
  const parser = new ArgumentParser({
    description: "Your simple static website generator",
  });

  parser.add_argument("action", { help: "build/serve" });

  const { action } = parser.parse_args();

  return { action };
}

module.exports = { parseArguments };
