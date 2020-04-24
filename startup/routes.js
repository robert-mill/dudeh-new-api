const express = require("express");
const abouts = require("../routes/about");
const homeMain = require("../routes/homeMain");
const events = require("../routes/events");
const users = require("../routes/users");
const navintro = require("../routes/navintro");
const video = require("../routes/video");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/abouts", abouts);
  app.use("/api/homeMain", homeMain);
  app.use("/api/navintro", navintro);
  app.use("/api/events", events);
  app.use("/api/users", users);
  app.use("/api/videos", video);
  app.use("/api/auth", auth);
  //app.use("/api/returns", returns);
  app.use(error);
};
