const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Math, validate } = require("../models/maths");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const maths = await Math.find().select("-__v");
  res.send(maths);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let math = new Math({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
  });
  math = await math.save();

  res.send(math);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const math = await Math.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!math)
    return res.status(404).send("The math with the given ID was not found.");

  res.send(math);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const math = await Math.findByIdAndRemove(req.params.id);

  if (!math)
    return res.status(404).send("The math with the given ID was not found.");

  res.send(math);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const math = await Math.findById(req.params.id).select("-__v");

  if (!math)
    return res.status(404).send("The math with the given ID was not found.");

  res.send(math);
});

module.exports = router;
