const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { ProfileGroup, validate } = require("../models/profileGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const profileGroups = await ProfileGroup.find().select("-__v");
  res.send(profileGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profileGroup = new ProfileGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.videoCaption,
  });
  profileGroup = await profileGroup.save();

  res.send(profileGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const profileGroup = await ProfileGroup.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      caption: req.body.caption,
      video: req.body.video,
      videoCaption: req.body.videoCaption,
    },
    {
      new: true,
    }
  );

  if (!profileGroup)
    return res
      .status(404)
      .send("The profileGroup with the given ID was not found.");

  res.send(profileGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const profileGroup = await ProfileGroup.findByIdAndRemove(req.params.id);

  if (!profileGroup)
    return res
      .status(404)
      .send("The profileGroup with the given ID was not found.");

  res.send(profileGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const profileGroup = await ProfileGroup.findById(req.params.id).select("-__v");

  if (!profileGroup)
    return res
      .status(404)
      .send("The profileGroup with the given ID was not found.");

  res.send(profileGroup);
});

module.exports = router;
