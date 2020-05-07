const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { HomeMain, validate } = require("../models/homeMain");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const homes = await HomeMain.find().select("-__v");
  res.send(homes);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let homeMain = new HomeMain({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    imageID: req.body.imageID,
  });
  homeMain = await homeMain.save();

  res.send(homeMain);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const homeMain = await HomeMain.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
      image: req.body.image,
      imageID: req.body.imageID,
    },
    {
      new: true,
    }
  );

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const homeMain = await HomeMain.findByIdAndRemove(req.params.id);

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const homeMain = await HomeMain.findById(req.params.id).select("-__v");

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

module.exports = router;
