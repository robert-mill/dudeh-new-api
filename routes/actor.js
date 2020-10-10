const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Actor, validate } = require("../models/actor");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const actors = await Actor.find().select("-__v");
  res.send(actors);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let actor = new Actor({
   
    image: req.body.image,
    caption: req.body.caption,
  });
  actor = await actor.save();

  res.send(actor);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const actor = await Actor.findByIdAndUpdate(
    req.params.id,
    {
   
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!actor)
    return res.status(404).send("The actor with the given ID was not found.");

  res.send(actor);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const actor = await Actor.findByIdAndRemove(req.params.id);

  if (!actor)
    return res.status(404).send("The actor with the given ID was not found.");

  res.send(actor);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const actor = await Actor.findById(req.params.id).select("-__v");

  if (!actor)
    return res.status(404).send("The actor with the given ID was not found.");

  res.send(actor);
});

module.exports = router;
