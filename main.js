#!/usr/bin/env node

const { parseArguments } = require("./src/args");

async function main() {
  const { action, directory } = await parseArguments();

  if (action === "build") {
    await require("./src/actions/build")(directory);
  } else if (action === "serve") {
    await require("./src/actions/serve")(directory);
  } else if (action === "new") {
    await require("./src/actions/new")(directory);
  } else if (action === "actionUpgrade") {
    require("./src/actions/upgrade")();
  } else if (action === "version") {
    require("./src/actions/version")();
  } else {
    console.error("Unknown action: ", action);
  }
}

main();
