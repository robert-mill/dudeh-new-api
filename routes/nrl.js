const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Nrl, validate } = require("../models/nrl");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const nrls = await Nrl.find().select("-__v");
  res.send(nrls);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let nrl = new Nrl({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.caption,
  });
  nrl = await nrl.save();

  res.send(nrl);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const nrl = await Nrl.findByIdAndUpdate(
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

  if (!nrl)
    return res.status(404).send("The nrl with the given ID was not found.");

  res.send(nrl);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const nrl = await Nrl.findByIdAndRemove(req.params.id);

  if (!nrl)
    return res.status(404).send("The nrl with the given ID was not found.");

  res.send(nrl);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const nrl = await Nrl.findById(req.params.id).select("-__v");

  if (!nrl)
    return res.status(404).send("The nrl with the given ID was not found.");

  res.send(nrl);
});

module.exports = router;
