const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Swimming, validate } = require("../models/swimming");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const swimmings = await Swimming.find().select("-__v");
  res.send(swimmings);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let swimming = new Swimming({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.caption,
  });
  swimming = await swimming.save();

  res.send(swimming);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const swimming = await Swimming.findByIdAndUpdate(
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

  if (!swimming)
    return res
      .status(404)
      .send("The swimming with the given ID was not found.");

  res.send(swimming);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const swimming = await Swimming.findByIdAndRemove(req.params.id);

  if (!swimming)
    return res
      .status(404)
      .send("The swimming with the given ID was not found.");

  res.send(swimming);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const swimming = await Swimming.findById(req.params.id).select("-__v");

  if (!swimming)
    return res
      .status(404)
      .send("The swimming with the given ID was not found.");

  res.send(swimming);
});

module.exports = router;
