const express = require("express");
const about = require("../routes/about");
const homeGroup = require("../routes/homeGroup");
const home = require("../routes/home");
const event = require("../routes/event");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/about", about);
  app.use("/api/homeGroup", homeGroup);
  app.use("/api/home", home);
  app.use("/api/event", event);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
