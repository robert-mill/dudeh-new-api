const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { HolidayGroup, validate } = require("../models/holidayGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const holidayGroups = await HolidayGroup.find().select("-__v");
  res.send(holidayGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let holidayGroup = new HolidayGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.videoCaption,
  });
  holidayGroup = await holidayGroup.save();

  res.send(holidayGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const holidayGroup = await HolidayGroup.findByIdAndUpdate(
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

  if (!holidayGroup)
    return res
      .status(404)
      .send("The holidayGroup with the given ID was not found.");

  res.send(holidayGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const holidayGroup = await HolidayGroup.findByIdAndRemove(req.params.id);

  if (!holidayGroup)
    return res
      .status(404)
      .send("The holidayGroup with the given ID was not found.");

  res.send(holidayGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const holidayGroup = await HolidayGroup.findById(req.params.id).select("-__v");

  if (!holidayGroup)
    return res
      .status(404)
      .send("The holidayGroup with the given ID was not found.");

  res.send(holidayGroup);
});

module.exports = router;
