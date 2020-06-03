const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Diving, validate } = require("../models/resource");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const resources = await Diving.find().select("-__v");
  res.send(resources);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let resource = new Diving({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    caption: req.body.caption,
  });
  resource = await resource.save();

  res.send(resource);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const resource = await Diving.findByIdAndUpdate(
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

  if (!resource)
    return res
      .status(404)
      .send("The resource with the given ID was not found.");

  res.send(resource);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const resource = await Diving.findByIdAndRemove(req.params.id);

  if (!resource)
    return res
      .status(404)
      .send("The resource with the given ID was not found.");

  res.send(resource);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const resource = await Diving.findById(req.params.id).select("-__v");

  if (!resource)
    return res
      .status(404)
      .send("The resource with the given ID was not found.");

  res.send(resource);
});

module.exports = router;
