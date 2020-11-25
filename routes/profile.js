const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {Profile, validate } = require("../models/profile");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const profiles = awaitProfile.find().select("-__v");
  res.send(profiles);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profile = newProfile({
   
    image: req.body.image,
    caption: req.body.caption,
  });
  profile = await profile.save();

  res.send(profile);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const profile = await Actor.findByIdAndUpdate(
    req.params.id,
    {
   
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!profile)
    return res.status(404).send("The profile with the given ID was not found.");

  res.send(profile);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const profile = await Actor.findByIdAndRemove(req.params.id);

  if (!profile)
    return res.status(404).send("The profile with the given ID was not found.");

  res.send(profile);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const profile = await Actor.findById(req.params.id).select("-__v");

  if (!profile)
    return res.status(404).send("The profile with the given ID was not found.");

  res.send(profile);
});

module.exports = router;
