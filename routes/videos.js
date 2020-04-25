const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Videos, validate } = require("../models/videos");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const videos = await Videos.find().select("-__v");
  res.send(videos);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let video = new Videos({
    heading: req.body.heading,
    body: req.body.body,
    videoLink: req.body.videoLink,
  });
  video = await video.save();

  res.send(video);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const video = await Videos.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      videoLink: req.body.videoLink,
    },
    {
      new: true,
    }
  );

  if (!video)
    return res.status(404).send("The video with the given ID was not found.");

  res.send(video);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const video = await Videos.findByIdAndRemove(req.params.id);

  if (!video)
    return res.status(404).send("The video with the given ID was not found.");

  res.send(video);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const video = await Videos.findById(req.params.id).select("-__v");

  if (!video)
    return res.status(404).send("The video with the given ID was not found.");

  res.send(video);
});

module.exports = router;
