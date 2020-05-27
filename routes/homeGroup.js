const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { HomeGroup, validate } = require("../models/homeGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const homeGroups = await HomeGroup.find().select("-__v");
  res.send(homeGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let home = new HomeGroup({
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

  const homeGroup = await HomeGroup.findByIdAndUpdate(
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

  if (!homeGroup)
    return res
      .status(404)
      .send("The homeGroup with the given ID was not found.");

  res.send(homeGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const homeGroup = await HomeGroup.findByIdAndRemove(req.params.id);

  if (!homeGroup)
    return res
      .status(404)
      .send("The homeGroup with the given ID was not found.");

  res.send(homeGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const homeGroup = await HomeGroup.findById(req.params.id).select("-__v");

  if (!homeGroup)
    return res
      .status(404)
      .send("The homeGroup with the given ID was not found.");

  res.send(homeGroup);
});

module.exports = router;
