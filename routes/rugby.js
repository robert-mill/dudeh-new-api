const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Rugby, validate } = require("../models/rugby");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rugbys = await Rugby.find().select("-__v");
  res.send(rugbys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let rugby = new Rugby({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    video: req.body.video,
    videoCaption: req.body.caption,
  });
  rugby = await rugby.save();

  res.send(rugby);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rugby = await Rugby.findByIdAndUpdate(
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

  if (!rugby)
    return res.status(404).send("The rugby with the given ID was not found.");

  res.send(rugby);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const rugby = await Rugby.findByIdAndRemove(req.params.id);

  if (!rugby)
    return res.status(404).send("The rugby with the given ID was not found.");

  res.send(rugby);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const rugby = await Rugby.findById(req.params.id).select("-__v");

  if (!rugby)
    return res.status(404).send("The rugby with the given ID was not found.");

  res.send(rugby);
});

module.exports = router;
