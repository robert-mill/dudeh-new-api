const express = require("express");
const aboutGallery = require("../routes/aboutGallery");
const aboutGroup = require("../routes/aboutGroup");
const about = require("../routes/about");
const actorGallery = require("../routes/actorGallery");
const actorGroup = require("../routes/actorGroup");
const actor = require("../routes/actor");
const bg = require("../routes/bg");

const cv = require("../routes/cv");

const gallery = require("../routes/gallery");

const homeGroup = require("../routes/homeGroup");
const holiday = require("../routes/holiday");
const holidayGallery = require("../routes/holidayGallery");
const holidayGroup = require("../routes/holidayGroup");
const home = require("../routes/home");
const divingGroup = require("../routes/divingGroup");
const divingGallery = require("../routes/divingGallery");
const diving = require("../routes/diving");
const event = require("../routes/event");

const interests = require("../routes/interests");

const music = require("../routes/music");
const nlCreate = require("../pdfindex");
const nrlGroup = require("../routes/nrlGroup");
const nrlGallery = require("../routes/nrlGallery");
const nrl = require("../routes/nrl");

const privacy = require("../routes/privacy");

const qualifications = require("../routes/qualifications");
const resource = require("../routes/resource");

const rugbyGroup = require("../routes/rugbyGroup");
const rugbyGallery = require("../routes/rugbyGallery");
const rugby = require("../routes/rugby");

const swimmingGroup = require("../routes/swimmingGroup");
const swimmingGallery = require("../routes/swimmingGallery");
const swimming = require("../routes/swimming");

const users = require("../routes/users");
const workExperience = require("../routes/workexperience");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/aboutGallery", aboutGallery);
  app.use("/api/aboutGroup", aboutGroup);
  app.use("/api/actorGroup", actorGroup);
  app.use("/api/actorGallery", actorGallery);
  app.use("/api/about", about);
  app.use("/api/actor", actor);
  app.use("/api/bg", bg);

  app.use("/api/cv", cv);
  app.use("/api/divingGallery", divingGallery);
  app.use("/api/divingGroup", divingGroup);
  app.use("/api/diving", diving);
  
  app.use("/api/holidayGallery", holidayGallery);
  app.use("/api/holidayGroup", holidayGroup);
  app.use("/api/holiday", holiday);
  
  app.use("/api/home", home);
  app.use("/api/gallery", gallery);
 
  app.use("/api/homeGroup", homeGroup);
  app.use("/api/interests", interests);

  app.use("/api/create-pdf", nlCreate);
  app.use("/api/fetch-pdf", nlCreate);
  app.use("/api/event", event);

  app.use("/api/nrlGallery", nrlGallery);
  app.use("/api/nrlGroup", nrlGroup);
  app.use("/api/nrl", nrl);

  app.use("/api/music", music);

  app.use("/api/privacy", privacy);

  app.use("/api/qualifications", qualifications);
  app.use("/api/resource", resource);

  app.use("/api/rugbyGallery", rugbyGallery);
  app.use("/api/rugbyGroup", rugbyGroup);
  app.use("/api/rugby", rugby);

  app.use("/api/swimmingGallery", swimmingGallery);
  app.use("/api/swimmingGroup", swimmingGroup);
  app.use("/api/swimming", swimming);

  app.use("/api/users", users);
  app.use("/api/workExperience", workExperience);

  app.use("/api/auth", auth);
  app.use(error);
};
