const controller = require("./controller");

module.exports = function (app) {
  app.route("/about").get(controller.about);
  app.route("/distance/:lat1/:lng1/:lat2/:lng2").get(controller.getDistance);
};
