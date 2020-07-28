const express = require("express");
const aboutGallery = require("../routes/aboutGallery");
const aboutGroup = require("../routes/aboutGroup");
const about = require("../routes/about");
const bg = require("../routes/bg");

const gallery = require("../routes/gallery");

const homeGroup = require("../routes/homeGroup");
const home = require("../routes/home");
const divingGroup = require("../routes/divingGroup");
const divingGallery = require("../routes/divingGallery");
const diving = require("../routes/diving");
const event = require("../routes/event");

const musicGroup = require("../routes/musicGroup");
const musicGallery = require("../routes/musicGallery");
const music = require("../routes/music");

const nrlGroup = require("../routes/nrlGroup");
const nrlGallery = require("../routes/nrlGallery");
const nrl = require("../routes/nrl");

const privacy = require("../routes/privacy");
const resource = require("../routes/resource");

const rugbyGroup = require("../routes/rugbyGroup");
const rugbyGallery = require("../routes/rugbyGallery");
const rugby = require("../routes/rugby");

const swimmingGroup = require("../routes/swimmingGroup");
const swimmingGallery = require("../routes/swimmingGallery");
const swimming = require("../routes/swimming");

const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/aboutGallery", aboutGallery);
  app.use("/api/aboutGroup", aboutGroup);
  app.use("/api/about", about);
  app.use("/api/bg", bg);
  app.use("/api/divingGallery", divingGallery);
  app.use("/api/divingGroup", divingGroup);
  app.use("/api/diving", diving);
  app.use("/api/gallery", gallery);
  app.use("/api/homeGroup", homeGroup);
  app.use("/api/home", home);
  app.use("/api/event", event);

  app.use("/api/nrlGallery", nrlGallery);
  app.use("/api/nrlGroup", nrlGroup);
  app.use("/api/nrl", nrl);

  app.use("/api/musicGallery", musicGallery);
  app.use("/api/musicGroup", musicGroup);
  app.use("/api/music", music);

  app.use("/api/privacy", privacy);
  app.use("/api/resource", resource);

  app.use("/api/rugbyGallery", rugbyGallery);
  app.use("/api/rugbyGroup", rugbyGroup);
  app.use("/api/rugby", rugby);

  app.use("/api/swimmingGallery", swimmingGallery);
  app.use("/api/swimmingGroup", swimmingGroup);
  app.use("/api/swimming", swimming);

  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
