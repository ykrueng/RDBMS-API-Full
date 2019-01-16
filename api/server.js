const express = require("express");

const configMdlware = require("./config/middleware");
const error = require("./common/error");

const server = express();
configMdlware(server);

server.get("/", (req, res) => {
  res.send("Welcome to DB-Zoos API");
});

server.use(error);

module.exports = server;