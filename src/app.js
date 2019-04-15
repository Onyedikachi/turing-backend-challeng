/* eslint-disable no-unused-vars */
require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();
const config = require("./config");
const { sendJSONResponse } = require("./helpers");
const logger = require("./config/logger");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "52428800" }));

const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));

const apiRoutes = require("./router");

app.use("/", apiRoutes);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (config.env !== "test") {
    logger.error("THIS IS ERR", err);
  }
  if (err.isBoom) {
    const { message } = err.data[0];
    sendJSONResponse(res, err.output.statusCode, null, req.method, message);
  } else if (err.status === 404) {
    sendJSONResponse(res, err.status, null, req.method, "Not Found");
  } else {
    sendJSONResponse(res, 500, null, req.method, "Something Went Wrong!");
  }
});

app.listen(config.port, () => logger.info("APP RUNNING ON ", config.port));

module.exports = { app };
