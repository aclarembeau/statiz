#!/usr/bin/env node

const { parseArguments } = require("./src/arg-parser");

async function main() {
  const { action } = await parseArguments();

  if (action === "build") {
    await require("./src/actions/build")();
  } else if (action === "serve") {
    await require("./src/actions/serve")();
  } else if (action === "new") {
    await require("./src/actions/new")();
  } else if (action === "upgrade") {
    require("./src/actions/upgrade")();
  } else if (action === "version") {
    require("./src/actions/version")();
  } else {
    console.error("Unknown action: ", action);
  }
}

main();
