const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Actor, validate } = require("../models/actor");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const Actors = await Actor.find().select("-__v");
  res.send(Actors);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let Actor = new Actor({
    image: req.body.image,
    caption: req.body.caption,
  });
  Actor = await Actor.save();

  res.send(Actor);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const Actor = await Actor.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!Actor)
    return res.status(404).send("The Actor with the given ID was not found.");

  res.send(Actor);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const Actor = await Actor.findByIdAndRemove(req.params.id);

  if (!Actor)
    return res.status(404).send("The Actor with the given ID was not found.");

  res.send(Actor);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const actor = await actor.findById(req.params.id).select("-__v");

  if (!actor)
    return res.status(404).send("The actor with the given ID was not found.");

  res.send(actor);
});

module.exports = router;
