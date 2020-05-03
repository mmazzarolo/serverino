#!/usr/bin/env node
"use strict";
const express = require("express");
const resolve = require("path").resolve;
const https = require("https");
const certs = require("https-localhost/certs");
const chalk = require("chalk");

const createApp = function (options = {}) {
  const {
    root = process.cwd(),
    path = "/",
    domain = "localhost",
    verbose = false,
    port = process.env.PORT || 8080,
    cors = false,
    secure = false,
  } = options;

  const app = express();

  if (secure) {
    app.listen = async function (...args) {
      app.server = https
        .createServer(await certs.getCerts(domain), app)
        .listen(...args);
      return app.server;
    };
  }

  if (cors) {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });
  }

  if (verbose) {
    app.use(function (req, res, next) {
      const time = new Date().toISOString().substr(11, 8);
      console.log(
        chalk.dim(`[${time}] › `) + chalk.green(`${req.method} `) + req.url
      );
      next();
    });
  }

  app.serve = function () {
    app.use(path, express.static(resolve(root)));
    app.listen(port, function () {
      const servedDir = options.root ? options.root : "the current directory";
      const address = `http${secure ? "s" : ""}://localhost:${port}${
        path ? path : ""
      }`;
      console.info(`Serving ${servedDir} on ${chalk.yellowBright(address)}`);
    });
  };

  return app;
};

module.exports = createApp;

if (require.main === module) {
  createApp().serve();
}
