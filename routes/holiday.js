const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Holiday, validate } = require("../models/holiday");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const holidays = await Holiday.find().select("-__v");
  res.send(holidays);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let holiday = new Holiday({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.caption,
  });
  holiday = await holiday.save();

  res.send(holiday);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const holiday = await Holiday.findByIdAndUpdate(
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

  if (!holiday)
    return res.status(404).send("The holiday with the given ID was not found.");

  res.send(holiday);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const holiday = await Holiday.findByIdAndRemove(req.params.id);

  if (!holiday)
    return res.status(404).send("The holiday with the given ID was not found.");

  res.send(holiday);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const holiday = await Holiday.findById(req.params.id).select("-__v");

  if (!holiday)
    return res.status(404).send("The holiday with the given ID was not found.");

  res.send(holiday);
});

module.exports = router;
