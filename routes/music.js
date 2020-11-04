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

    genre: req.body.genre,
    caption: req.body.caption,
    image: req.body.image,
    music: req.body.music,
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
      genre: req.body.genre,
      caption: req.body.caption,
      image: req.body.image,
      music: req.body.music,
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
