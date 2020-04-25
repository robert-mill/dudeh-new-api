const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Events, validate } = require("../models/videos");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const videos = await Events.find();
  res.send(videos);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let video = new Events({
    heading: req.body.heading,
    body: req.body.body,
    videoLink: req.body.videoLink,
  });
  video = await video.save();

  res.send(video);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const video = await Events.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      videoLink: req.body.videoLink,
    },
    { new: true }
  );
  if (!video)
    return res.status(404).send("The video with the given ID was not found.");
  res.send(video);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const video = await Events.findByIdAndRemove(req.params.id);
  if (!video)
    return res.status(404).send("The video with the given ID was not found.");
  res.send(video);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const video = await Events.findById(req.params.id).select("-__v");
  if (!video)
    return res.status(404).send("The video with the given ID was not found.");
  res.send(video);
});

module.exports = router;
