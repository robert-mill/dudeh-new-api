const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Interest, validate } = require("../models/interests");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const interests = await Interest.find().select("-__v");
  res.send(interests);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let interest = new Interest({
    heading: req.body.heading,
    body: req.body.body,
  });
  interest = await interest.save();

  res.send(interest);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const interest = await Interest.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
    },
    {
      new: true,
    }
  );

  if (!interest)
    return res
      .status(404)
      .send("The interest with the given ID was not found.");

  res.send(interest);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const interest = await Interest.findByIdAndRemove(req.params.id);

  if (!interest)
    return res
      .status(404)
      .send("The interest with the given ID was not found.");

  res.send(interest);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const interest = await Interest.findById(req.params.id).select("-__v");

  if (!interest)
    return res
      .status(404)
      .send("The interest with the given ID was not found.");

  res.send(interest);
});

module.exports = router;
