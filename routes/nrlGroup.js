const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { NrlGroup, validate } = require("../models/nrlGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const nrlGroups = await NrlGroup.find().select("-__v");
  res.send(nrlGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let nrlGroup = new NrlGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.videoCaption,
  });
  nrlGroup = await nrlGroup.save();

  res.send(nrlGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const nrlGroup = await NrlGroup.findByIdAndUpdate(
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

  if (!nrlGroup)
    return res
      .status(404)
      .send("The nrlGroup with the given ID was not found.");

  res.send(nrlGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const nrlGroup = await NrlGroup.findByIdAndRemove(req.params.id);

  if (!nrlGroup)
    return res
      .status(404)
      .send("The nrlGroup with the given ID was not found.");

  res.send(nrlGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const nrlGroup = await NrlGroup.findById(req.params.id).select("-__v");

  if (!nrlGroup)
    return res
      .status(404)
      .send("The nrlGroup with the given ID was not found.");

  res.send(nrlGroup);
});

module.exports = router;
