const glob = require("glob");
const path = require("path");
const { differenceInMilliseconds } = require("date-fns");
const nStatic = require("node-static");
const http = require("http");
const fsSync = require("fs");
const chokidar = require("chokidar");

const { transformFile, transformFiles } = require("../engine");
const { sleep } = require("../utils");
let { WebSocketServer } = require("ws");
const { loadTransformations } = require("../transformations/loader");
const fs = require("fs/promises");

const HTTP_PORT = 5000;
let HOT_RELOAD_PORT = 8989;

function setupWebsocketServer(wsClients) {
  const wss = new WebSocketServer({ port: HOT_RELOAD_PORT });
  wss.on("connection", function connection(ws) {
    wsClients.push(ws);
  });
}

function setupHttpServer() {
  const fileServer = new nStatic.Server("dist", { cache: 0 });
  http
    .createServer(function (req, res) {
      fileServer.serve(req, res);
    })
    .listen(HTTP_PORT);
}

function watchChanges(source, changedFiles, dist, parentDependencies) {
  chokidar.watch(source).on("all", (event, filename) => {
    if (
      !fsSync.existsSync(filename) ||
      fsSync.lstatSync(filename).isDirectory() ||
      filename.includes(dist) ||
      path.basename(filename).startsWith("_")
    ) {
      return;
    }

    filename = path.join(source, filename);
    changedFiles.add(filename);

    // If a change occur to an included file, add it
    if (parentDependencies[filename]) {
      for (let file of parentDependencies[filename]) {
        changedFiles.add(file);
      }
    }
  });
}

module.exports = async function () {
  console.log("========================\n");
  console.log("Building destination directory");
  await fs.mkdir("dist", { recursive: true });
  console.log("...done\n");

  console.log("Starting up HTTP server");
  setupHttpServer();
  console.log("...done\n");

  console.log("Startup up hot-reload");
  let wsClients = [];
  setupWebsocketServer(wsClients);
  console.log("...done\n");

  console.log("Watching source directory");
  let parentDependencies = {};
  let changedFiles = new Set();
  watchChanges("./", changedFiles, "dist", parentDependencies);
  console.log("...done\n");

  console.log("Loading transformations");
  let processTransforms = loadTransformations("processing");
  let postprocessTrasnforms = loadTransformations("postprocessing");
  console.log("...done\n");

  console.log("Initialization successful:");
  console.log("  Serving on: http://localhost:" + HTTP_PORT);

  console.log("\n========================");

  console.log("\n\n");
  while (true) {
    if (changedFiles.size) {
      await transformFiles(
        "serve",
        processTransforms,
        changedFiles,
        parentDependencies
      );
      for (let transform of postprocessTrasnforms) {
        await transform("serve", {
          src: "./",
          dist: "dist",
        });
      }

      for (let client of wsClients) {
        client.send("reload");
      }

      changedFiles.clear();
    }

    await sleep(200);
  }
};
