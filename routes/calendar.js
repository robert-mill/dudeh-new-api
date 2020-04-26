const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Calendar, validate } = require("../models/calendar");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const calendar = await Calendar.find();
  res.send(calendar);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let calendar = new Calendar({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    allDay: req.body.allDay,
    extendedProps: req.body.extendedProps,
    classNames: req.body.classNames,
    backgroundColor: req.body.backgroundColor,
    borderColor: req.body.borderColor,
    textColor: req.body.textColor,
    description: req.body.description,
    url: req.body.url,
  });
  calendar = await calendar.save();

  res.send(calendar);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const calendar = await Calendar.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay,
      extendedProps: req.body.extendedProps,
      classNames: req.body.classNames,
      backgroundColor: req.body.backgroundColor,
      borderColor: req.body.borderColor,
      textColor: req.body.textColor,
      description: req.body.description,
      url: req.body.url,
    },
    { new: true }
  );
  if (!calendar)
    return res
      .status(404)
      .send("The calendar with the given ID was not found.");
  res.send(calendar);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const calendar = await Calendar.findByIdAndRemove(req.params.id);
  if (!calendar)
    return res
      .status(404)
      .send("The calendar with the given ID was not found.");
  res.send(calendar);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const calendar = await Calendar.findById(req.params.id).select("-__v");
  if (!calendar)
    return res
      .status(404)
      .send("The calendar with the given ID was not found.");
  res.send(calendar);
});

module.exports = router;
