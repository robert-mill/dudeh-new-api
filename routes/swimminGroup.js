const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { SwimmingGroup, validate } = require("../models/swimmingGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const swimmingGroups = await SwimmingGroup.find().select("-__v");
  res.send(swimmingGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let swimmingGroup = new SwimmingGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.videoCaption,
  });
  swimmingGroup = await swimmingGroup.save();

  res.send(swimmingGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const swimmingGroup = await SwimmingGroup.findByIdAndUpdate(
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

  if (!swimmingGroup)
    return res
      .status(404)
      .send("The swimmingGroup with the given ID was not found.");

  res.send(swimmingGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const swimmingGroup = await SwimmingGroup.findByIdAndRemove(req.params.id);

  if (!swimmingGroup)
    return res
      .status(404)
      .send("The swimmingGroup with the given ID was not found.");

  res.send(swimmingGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const swimmingGroup = await SwimmingGroup.findById(req.params.id).select(
    "-__v"
  );

  if (!swimmingGroup)
    return res
      .status(404)
      .send("The swimmingGroup with the given ID was not found.");

  res.send(swimmingGroup);
});

module.exports = router;
