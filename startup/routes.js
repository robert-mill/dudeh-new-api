const express = require("express");
const aboutGallery = require("../routes/aboutGallery");
const aboutGroup = require("../routes/aboutGroup");
const about = require("../routes/about");
const homeGroup = require("../routes/homeGroup");
const home = require("../routes/home");
const event = require("../routes/event");
const privacy = require("../routes/privacy");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/aboutGallery", aboutGallery);
  app.use("/api/aboutGroup", aboutGroup);
  app.use("/api/about", about);
  app.use("/api/homeGroup", homeGroup);
  app.use("/api/home", home);
  app.use("/api/event", event);
  app.use("/api/privacy", privacy);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
