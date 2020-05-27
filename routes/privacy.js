const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Privacy, validate } = require("../models/privacy");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const privacys = await Privacy.find().select("-__v");
  res.send(privacys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let privacy = new Privacy({
    heading: req.body.heading,
    body: req.body.body,
  });
  privacy = await privacy.save();

  res.send(privacy);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const privacy = await Privacy.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
    },
    {
      new: true,
    }
  );

  if (!privacy)
    return res.status(404).send("The privacy with the given ID was not found.");

  res.send(privacy);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const privacy = await Privacy.findByIdAndRemove(req.params.id);

  if (!privacy)
    return res.status(404).send("The privacy with the given ID was not found.");

  res.send(privacy);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const privacy = await Privacy.findById(req.params.id).select("-__v");

  if (!privacy)
    return res.status(404).send("The privacy with the given ID was not found.");

  res.send(privacy);
});

module.exports = router;
