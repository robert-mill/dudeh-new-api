const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { AboutGroup, validate } = require("../models/aboutGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const aboutGroups = await AboutGroup.find().select("-__v");
  res.send(aboutGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let aboutGroup = new AboutGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
  });
  aboutGroup = await aboutGroup.save();

  res.send(aboutGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const aboutGroup = await AboutGroup.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!aboutGroup)
    return res
      .status(404)
      .send("The aboutGroup with the given ID was not found.");

  res.send(aboutGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const aboutGroup = await AboutGroup.findByIdAndRemove(req.params.id);

  if (!aboutGroup)
    return res
      .status(404)
      .send("The aboutGroup with the given ID was not found.");

  res.send(aboutGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const aboutGroup = await AboutGroup.findById(req.params.id).select("-__v");

  if (!aboutGroup)
    return res
      .status(404)
      .send("The aboutGroup with the given ID was not found.");

  res.send(aboutGroup);
});

module.exports = router;
