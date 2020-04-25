const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Events, validate } = require("../models/events");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Events.find().select("-__v");
  res.send(events);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let event = new Events({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    imageID: req.body.imageID,
  });
  event = await event.save();

  res.send(event);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const event = await Events.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      imageID: req.body.imageID,
    },
    {
      new: true,
    }
  );

  if (!event)
    return res.status(404).send("The event with the given ID was not found.");

  res.send(event);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const event = await Events.findByIdAndRemove(req.params.id);

  if (!event)
    return res.status(404).send("The event with the given ID was not found.");

  res.send(event);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const event = await Events.findById(req.params.id).select("-__v");

  if (!event)
    return res.status(404).send("The event with the given ID was not found.");

  res.send(event);
});

module.exports = router;
