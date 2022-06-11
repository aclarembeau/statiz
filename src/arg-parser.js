const { ArgumentParser } = require("argparse");
const fsSync = require("fs");
const path = require("path");
const fs = require("fs/promises");

async function parseArguments() {
  const parser = new ArgumentParser({
    description: "Your simple static website generator",
  });

  var subparsers = parser.add_subparsers({
    title: "action",
    dest: "action",
  });

  subparsers.add_parser("new", { add_help: true }).add_argument("directory");
  subparsers.add_parser("build", { add_help: true });
  subparsers.add_parser("serve", { add_help: true });
  subparsers.add_parser("upgrade", { add_help: true });
  subparsers.add_parser("version", { add_help: true });

  const { action, directory } = parser.parse_args();

  return { action, directory };
}

module.exports = { parseArguments };
