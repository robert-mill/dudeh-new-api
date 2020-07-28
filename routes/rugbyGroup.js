const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { RugbyGroup, validate } = require("../models/rugbyGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rugbyGroups = await RugbyGroup.find().select("-__v");
  res.send(rugbyGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let rugbyGroup = new RugbyGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.videoCaption,
  });
  rugbyGroup = await rugbyGroup.save();

  res.send(rugbyGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rugbyGroup = await RugbyGroup.findByIdAndUpdate(
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

  if (!rugbyGroup)
    return res
      .status(404)
      .send("The rugbyGroup with the given ID was not found.");

  res.send(rugbyGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const rugbyGroup = await RugbyGroup.findByIdAndRemove(req.params.id);

  if (!rugbyGroup)
    return res
      .status(404)
      .send("The rugbyGroup with the given ID was not found.");

  res.send(rugbyGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const rugbyGroup = await RugbyGroup.findById(req.params.id).select("-__v");

  if (!rugbyGroup)
    return res
      .status(404)
      .send("The rugbyGroup with the given ID was not found.");

  res.send(rugbyGroup);
});

module.exports = router;
