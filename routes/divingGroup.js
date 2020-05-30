const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { DivingGroup, validate } = require("../models/divingGroup");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const divingGroups = await DivingGroup.find().select("-__v");
  res.send(divingGroups);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let divingGroup = new DivingGroup({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
  });
  divingGroup = await divingGroup.save();

  res.send(divingGroup);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const divingGroup = await DivingGroup.findByIdAndUpdate(
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

  if (!divingGroup)
    return res
      .status(404)
      .send("The divingGroup with the given ID was not found.");

  res.send(divingGroup);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const divingGroup = await DivingGroup.findByIdAndRemove(req.params.id);

  if (!divingGroup)
    return res
      .status(404)
      .send("The divingGroup with the given ID was not found.");

  res.send(divingGroup);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const divingGroup = await DivingGroup.findById(req.params.id).select("-__v");

  if (!divingGroup)
    return res
      .status(404)
      .send("The divingGroup with the given ID was not found.");

  res.send(divingGroup);
});

module.exports = router;
