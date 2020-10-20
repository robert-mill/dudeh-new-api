const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { ActorGroup, validate } = require("../models/actorGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const actorGroups = await ActorGroup.find().select("-__v");
  res.send(actorGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let actorGroup = new ActorGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.videoCaption,
  });
  actorGroup = await actorGroup.save();

  res.send(actorGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const actorGroup = await ActorGroup.findByIdAndUpdate(
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

  if (!actorGroup)
    return res
      .status(404)
      .send("The actorGroup with the given ID was not found.");

  res.send(actorGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const actorGroup = await ActorGroup.findByIdAndRemove(req.params.id);

  if (!actorGroup)
    return res
      .status(404)
      .send("The actorGroup with the given ID was not found.");

  res.send(actorGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const actorGroup = await ActorGroup.findById(req.params.id).select("-__v");

  if (!actorGroup)
    return res
      .status(404)
      .send("The actorGroup with the given ID was not found.");

  res.send(actorGroup);
});

module.exports = router;
