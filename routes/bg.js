const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Bg, validate } = require("../models/bg");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const bgs = await Bg.find().select("-__v");
  res.send(bgs);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let bg = new Bg({
    image: req.body.image,
  });
  bg = await bg.save();

  res.send(bg);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const bg = await Bg.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
    },
    {
      new: true,
    }
  );

  if (!bg)
    return res.status(404).send("The bg with the given ID was not found.");

  res.send(bg);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const bg = await Bg.findByIdAndRemove(req.params.id);

  if (!bg)
    return res.status(404).send("The bg with the given ID was not found.");

  res.send(bg);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const bg = await Bg.findById(req.params.id).select("-__v");

  if (!bg)
    return res.status(404).send("The bg with the given ID was not found.");

  res.send(bg);
});

module.exports = router;
