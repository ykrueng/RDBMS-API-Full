const express = require("express");

const configMdlware = require("./config/middleware");
const error = require("./common/error");

const cohortsRoute = require("./cohorts/cohortsRoute");

const server = express();
configMdlware(server);

server.get("/", (req, res) => {
  res.send("Welcome to DB-Zoos API");
});

server.use("/cohorts", cohortsRoute);

server.use(error);

module.exports = server;