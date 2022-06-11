#!/usr/bin/env node

const { parseArguments } = require("./src/argparse");

async function main() {
  const { command, directory } = await parseArguments();

  if (command === "build") {
    await require("./src/commands/build")();
  } else if (command === "serve") {
    await require("./src/commands/serve")();
  } else if (command === "new") {
    await require("./src/commands/new")(directory);
  } else if (command === "upgrade") {
    require("./src/commands/upgrade")();
  } else if (command === "version") {
    require("./src/commands/version")();
  } else {
    console.error("Unknown command: ", command);
  }
}

main();
