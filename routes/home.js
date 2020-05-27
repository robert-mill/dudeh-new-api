const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Home, validate } = require("../models/home");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const homes = await Home.find().select("-__v");
  res.send(homes);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let home = new Home({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
  });
  home = await home.save();

  res.send(home);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const home = await Home.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!home)
    return res.status(404).send("The home with the given ID was not found.");

  res.send(home);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const home = await Home.findByIdAndRemove(req.params.id);

  if (!home)
    return res.status(404).send("The home with the given ID was not found.");

  res.send(home);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const home = await Home.findById(req.params.id).select("-__v");

  if (!home)
    return res.status(404).send("The home with the given ID was not found.");

  res.send(home);
});

module.exports = router;
