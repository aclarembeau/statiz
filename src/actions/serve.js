const glob = require("glob");
const path = require("path");
const { differenceInMilliseconds } = require("date-fns");
const nStatic = require("node-static");
const http = require("http");
const fsSync = require("fs");
const { execSync } = require("child_process");
const { handleFile } = require("../engine");
const { sleep } = require("../utils");
let { WebSocketServer } = require("ws");
const { loadPlugins } = require("../plugin-loader");
const fs = require("fs/promises");

const HTTP_PORT = 5000;
let HOT_RELOAD_PORT = 8989;

function setupWebsocketServer(wsClients) {
  console.log("Setting up websocket server...");
  const wss = new WebSocketServer({ port: HOT_RELOAD_PORT });
  wss.on("connection", function connection(ws) {
    wsClients.push(ws);
  });
}

function setupHttpServer(fileServer) {
  console.log("Setting up http server...");
  http
    .createServer(function (req, res) {
      fileServer.serve(req, res);
    })
    .listen(HTTP_PORT);
}

function watchChanges(source, changedFiles) {
  fsSync.watch(source, async (eventType, filename) => {
    filename = path.join(source, filename);
    changedFiles.add(filename);
  });
}

async function actionServe() {
  const dist = path.join("./", "dist");
  await fs.mkdir(dist, { recursive: true });
  const fileServer = new nStatic.Server(dist, { cache: 0 });

  console.log(`Serving '${dist}' over port ${HTTP_PORT}`);
  console.log(`Open http://localhost:${HTTP_PORT} to access it`);
  console.log("");

  let wsClients = [];
  console.log("Setting up servers");
  setupWebsocketServer(wsClients);
  setupHttpServer(fileServer);
  console.log("");

  let changedFiles = new Set(glob.sync("**/*"));
  watchChanges("./", changedFiles);

  console.log("Loading plugins");
  let plugins = loadPlugins();

  while (true) {
    if (changedFiles.size) {
      console.log("Rebuilding...");

      let t0 = new Date();
      let promises = [];

      for (let file of changedFiles) {
        if (
          fsSync.existsSync(file) &&
          fsSync.lstatSync(file).isFile() &&
          !file.includes(dist)
        )
          promises.push(handleFile("serve", "./", file, dist, plugins));
      }

      for (let plugin of plugins) {
        await plugin("serve", "postprocessing", { src: "./", dist });
      }

      changedFiles.clear();

      await Promise.all(promises);
      console.log("");
      console.log(
        "Elapsed time: ",
        differenceInMilliseconds(new Date(), t0),
        "ms"
      );
      console.log("");
      console.log("");
      console.log("");

      for (let client of wsClients) {
        client.send("reload");
      }
    }

    await sleep(200);
  }
}

module.exports = actionServe;
