#!/usr/bin/env node
const { ArgumentParser } = require("argparse");

const fs = require("fs/promises");
const path = require("path");
const fsSync = require("fs");
const glob = require("glob");
const sass = require("node-sass");
const http = require("http");
const nStatic = require("node-static");
const { differenceInMilliseconds } = require("date-fns");
let { exec } = require("child_process");

function sassASync(srcFile) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: srcFile,
      },
      (err, result) => {
        if (err) reject(err);
        if (result) resolve(result);
      }
    );
  });
}

function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delay);
  });
}

const buildFile = async (srcDir, srcFile, distDir) => {
  console.log("Building", srcFile);
  const outFile = path.join(distDir, path.relative(srcDir, srcFile));

  if (srcFile.endsWith(".ejs")) {
    // Compile
  } else if (srcFile.endsWith(".html")) {
    let content = await fs.readFile(srcFile);
    let newContent = content.toString().replace(
      "</html>",
      `<script>
let socket = new WebSocket("ws://localhost:8989");
socket.onopen = (e) => console.log('reload socket open')
socket.onclose = (event) => console.log('reload socket closed')
socket.onerror = (error) => console.log('reload socket error: ', error)
socket.onmessage = (event) => window.location.reload(true);
</script></html>`
    );
    await fs.writeFile(outFile, newContent);
  } else if (srcFile.endsWith(".js", ".css")) {
  } else if (srcFile.endsWith(".scss")) {
    // compile
    // Minimize
    const res = await sassASync(srcFile);
    await fs.writeFile(outFile.replace(".scss", ".css"), res.css);
  } else if (srcFile.endsWith(".png", ".jpg", ".jpeg")) {
    // compress
  } else {
    // copy
    await fs.copyFile(srcFile, outFile);
  }

  console.log("Finished", srcFile);
};

async function main() {
  const parser = new ArgumentParser({
    description: "Your simple static website generator",
  });

  parser.add_argument("action", { help: "build/serve" });
  parser.add_argument("-s", "--src", {
    help: "source directory",
    default: "./",
  });

  const { action, src: source } = parser.parse_args();

  if (!fsSync.existsSync(source)) {
    console.error("Source directory does not exist:", source);
    return;
  }

  const dist = path.join(source, "dist");
  await fs.mkdir(dist, { recursive: true });

  if (action === "build") {
    const files = glob.sync(path.join(source, "**/*"));

    let t0 = new Date();
    let promises = [];

    for (const file of files) {
      if (!file.includes(dist)) promises.push(buildFile(source, file, dist));
    }

    await Promise.all(promises);

    console.log("Elapsed time: ", differenceInMilliseconds(new Date(), t0));
  } else if (action === "serve") {
    const fileServer = new nStatic.Server(dist, { cache: 0 });

    console.log("Serving " + dist + " over port 5000");
    console.log("Open http://localhost:5000 to access it");

    console.log("Setting up file server");

    let { WebSocketServer } = require("ws");

    const wss = new WebSocketServer({ port: 8989 });

    let wsClients = [];
    wss.on("connection", function connection(ws) {
      wsClients.push(ws);
    });

    http
      .createServer(function (req, res) {
        fileServer.serve(req, res);
      })
      .listen(5000);

    let toRebuild = new Set();
    fsSync.watch(source, async (eventType, filename) => {
      filename = path.join(source, filename);
      toRebuild.add(filename);
    });

    while (true) {
      if (toRebuild.size) {
        console.log("Rebuilding...");

        let t0 = new Date();
        let promises = [];

        for (let file of toRebuild) {
          if (fsSync.existsSync(file) && fsSync.lstatSync(file).isFile())
            promises.push(buildFile(source, file, dist));
        }

        toRebuild.clear();

        await Promise.all(promises);
        console.log("Elapsed time: ", differenceInMilliseconds(new Date(), t0));

        for (let client of wsClients) {
          client.send("reload");
        }
      }

      await sleep(200);
    }
  } else if (action === "upgrade") {
    console.log("Upgrading statiz code...");
    console.log(exec("git pull", { cwd: __dirname }));

    console.log("Installing dependencies...");
    console.log(exec("npm i", { cwd: __dirname }));
  } else if (action === "version") {
    console.log(require("./package.json").version);
  } else {
    console.error("Unknown action: ", action);
  }
}

main();
