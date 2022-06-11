const { ArgumentParser } = require("argparse");
require("fs");
require("path");
require("fs/promises");

async function parseArguments() {
  const parser = new ArgumentParser({
    description: "Your simple static website generator",
  });

  const subparsers = parser.add_subparsers({
    title: "command",
    dest: "command",
  });

  subparsers.add_parser("new", { add_help: true }).add_argument("directory");
  subparsers.add_parser("build", { add_help: true });
  subparsers.add_parser("serve", { add_help: true });
  subparsers.add_parser("version", { add_help: true });

  const { command, directory } = parser.parse_args();

  return { command, directory };
}

module.exports = { parseArguments };
