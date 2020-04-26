const express = require("express");
const abouts = require("../routes/about");
const contacts = require("../routes/contact");
const homeMain = require("../routes/homeMain");
const events = require("../routes/events");
const users = require("../routes/users");
const navintro = require("../routes/navintro");
const testimonials = require("../routes/testimonials");
const videos = require("../routes/videos");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/abouts", abouts);
  app.use("/api/contacts", contacts);
  app.use("/api/homeMain", homeMain);
  app.use("/api/navintro", navintro);
  app.use("/api/events", events);
  app.use("/api/users", users);
  app.use("/api/testimonials", testimonials);
  app.use("/api/videos", videos);
  app.use("/api/auth", auth);
  //app.use("/api/returns", returns);
  app.use(error);
};
