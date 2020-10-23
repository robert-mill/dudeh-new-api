const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { FormulaVideo, validate } = require("../models/formulaVideo");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const formulaVideos = await FormulaVideo.find().select("-__v");
  res.send(formulaVideos);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let formulaVideo = new FormulaVideo({
    articleId: req.body.articleId,
    heading: req.body.heading,
    body: req.body.body,
    video: req.body.video,
    videoCaption: req.body.caption,
  });
  formulaVideo = await formulaVideo.save();

  res.send(formulaVideo);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const formulaVideo = await FormulaVideo.findByIdAndUpdate(
    req.params.id,
    {
      articleId: req.body.articleId,
      heading: req.body.heading,
      body: req.body.body,
      video: req.body.video,
      videoCaption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!formulaVideo)
    return res.status(404).send("The formulaVideo with the given ID was not found.");

  res.send(formulaVideo);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const formulaVideo = await FormulaVideo.findByIdAndRemove(req.params.id);

  if (!formulaVideo)
    return res.status(404).send("The formulaVideo with the given ID was not found.");

  res.send(formulaVideo);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const formulaVideo = await FormulaVideo.findById(req.params.id).select("-__v");

  if (!formulaVideo)
    return res.status(404).send("The formulaVideo with the given ID was not found.");

  res.send(formulaVideo);
});

module.exports = router;
