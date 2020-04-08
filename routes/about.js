const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Abouts, validate } = require("../models/about");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const abouts = await Abouts.find().select("-__v");
  res.send(abouts);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let about = new Abouts({
    heading: req.body.heading,
    body: req.body.body,
    aboutImage: req.body.aboutImage,
    aboutImageID: req.body.aboutImageID,
  });
  about = await about.save();

  res.send(about);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const about = await Abouts.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      aboutImage: req.body.aboutImage,
      aboutImageID: req.body.aboutImageID,
    },
    {
      new: true,
    }
  );

  if (!about)
    return res.status(404).send("The about with the given ID was not found.");

  res.send(about);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const about = await Abouts.findByIdAndRemove(req.params.id);

  if (!about)
    return res.status(404).send("The about with the given ID was not found.");

  res.send(about);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const about = await Abouts.findById(req.params.id).select("-__v");

  if (!about)
    return res.status(404).send("The about with the given ID was not found.");

  res.send(about);
});

module.exports = router;
