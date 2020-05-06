#!/usr/bin/env node
"use strict";

const meow = require("meow");
const serverino = require("./index.js");

const cli = meow(
  `
  Usage
    $ serverino [dir] [path]
  Options
    --port -p     Port
    --secure -s   Use HTTPS
    --cors -c     Set "Access-Control-Allow-Origin" to "*"
    --verbose -v  Log requests
  Examples
    $ serverino
    $ serverino ~/build
    $ serverino dist /admin/
  Run without arguments serves the current directory on http:/localhost:8080/.
`,
  {
    inferType: true,
    flags: {
      port: {
        type: "number",
        alias: "p",
        default: 8080,
      },
      secure: {
        type: "boolean",
        alias: "s",
        default: false,
      },
      cors: {
        type: "boolean",
        alias: "c",
        default: false,
      },
      verbose: {
        type: "boolean",
        alias: "v",
        default: false,
      },
    },
  }
);

process.on("uncaughtException", function (err) {
  switch (err.errno) {
    case "EACCES":
      console.error(
        "EACCES: run as administrator to use the default ports 443 and 80. " +
          "You can also change port with: `serverino -p 1337`."
      );
      break;
    case "EADDRINUSE":
      console.error(
        "EADDRINUSE: another service on your machine is using " +
          "the current port.\nStop it or change port with:" +
          "`serverino -p 1337`."
      );
      break;
    default:
      console.error("Unexpected error " + err.errno + ":\n\n" + err);
      break;
  }
  process.exit(1);
});

const [root, path] = cli.input;

serverino({
  root: root,
  path: path,
  ...cli.flags,
}).serve();
