const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Diving, validate } = require("../models/diving");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const divings = await Diving.find().select("-__v");
  res.send(divings);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let diving = new Diving({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.caption,
  });
  diving = await diving.save();

  res.send(diving);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const diving = await Diving.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      caption: req.body.caption,
      video: req.body.video,
      videoCaption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!diving)
    return res.status(404).send("The diving with the given ID was not found.");

  res.send(diving);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const diving = await Diving.findByIdAndRemove(req.params.id);

  if (!diving)
    return res.status(404).send("The diving with the given ID was not found.");

  res.send(diving);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const diving = await Diving.findById(req.params.id).select("-__v");

  if (!diving)
    return res.status(404).send("The diving with the given ID was not found.");

  res.send(diving);
});

module.exports = router;
