"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const controller = require("./controller");

const routes = require("./api/routes");
routes(app);
app.listen(port, function () {
  console.log("Server started on port: " + port);
});

module.exports = function (app) {
  app.route("/about").get(controller.about);
  app.route("/distance/:lat1/:lng1/:lat2/:lng2").get(controller.getDistance);
};
