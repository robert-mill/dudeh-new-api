const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Music, validate } = require("../models/music");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const musics = await Music.find().select("-__v");
  res.send(musics);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let music = new Music({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
    music: req.body.music,
    musicCaption: req.body.musicCaption,
  });
  music = await music.save();

  res.send(music);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const music = await Music.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      caption: req.body.caption,
      music: req.body.music,
      musicCaption: req.body.musicCaption,
    },
    {
      new: true,
    }
  );

  if (!music)
    return res.status(404).send("The music with the given ID was not found.");

  res.send(music);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const music = await Music.findByIdAndRemove(req.params.id);

  if (!music)
    return res.status(404).send("The music with the given ID was not found.");

  res.send(music);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const music = await Music.findById(req.params.id).select("-__v");

  if (!music)
    return res.status(404).send("The music with the given ID was not found.");

  res.send(music);
});

module.exports = router;
