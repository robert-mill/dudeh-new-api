const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Testimonials, validate } = require("../models/testimonials");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const testimonials = await Testimonials.find();
  res.send(testimonials);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let testimonial = new Testimonials({
    heading: req.body.heading,
    body: req.body.body,
    videoLink: req.body.videoLink,
  });
  testimonial = await testimonial.save();

  res.send(testimonial);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const testimonial = await Testimonials.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      videoLink: req.body.videoLink,
    },
    { new: true }
  );
  if (!testimonial)
    return res
      .status(404)
      .send("The testimonial with the given ID was not found.");
  res.send(testimonial);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const testimonial = await Testimonials.findByIdAndRemove(req.params.id);
  if (!testimonial)
    return res
      .status(404)
      .send("The testimonial with the given ID was not found.");
  res.send(testimonial);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const testimonial = await Testimonials.findById(req.params.id).select("-__v");
  if (!testimonial)
    return res
      .status(404)
      .send("The testimonial with the given ID was not found.");
  res.send(testimonial);
});

module.exports = router;
