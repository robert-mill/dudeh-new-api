const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { ActorGallery, validate } = require("../models/actorGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const actorGallerys = await ActorGallery.find().select("-__v");
  res.send(actorGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let actorGallery = new ActorGallery({
    name: req.body.name,
    image: req.body.image,
    caption: req.body.caption,
  });
  actorGallery = await actorGallery.save();

  res.send(actorGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const actorGallery = await ActorGallery.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!actorGallery)
    return res
      .status(404)
      .send("The actorGallery with the given ID was not found.");

  res.send(actorGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const actorGallery = await ActorGallery.findByIdAndRemove(req.params.id);

  if (!actorGallery)
    return res
      .status(404)
      .send("The actorGallery with the given ID was not found.");

  res.send(actorGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const actorGallery = await ActorGallery.findById(req.params.id).select(
    "-__v"
  );

  if (!actorGallery)
    return res
      .status(404)
      .send("The actorGallery with the given ID was not found.");

  res.send(actorGallery);
});

module.exports = router;
