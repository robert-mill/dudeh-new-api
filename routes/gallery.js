const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Gallerys, validate } = require("../models/gallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const gallerys = await Gallerys.find().select("-__v");
  res.send(gallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let gallery = new Gallerys({
    heading: req.body.heading,
    body: req.body.body,
    image: req.body.image,
    imageID: req.body.imageID,
  });
  gallery = await gallery.save();

  res.send(gallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gallery = await Gallerys.findByIdAndUpdate(
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

  if (!gallery)
    return res.status(404).send("The gallery with the given ID was not found.");

  res.send(gallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const gallery = await Gallerys.findByIdAndRemove(req.params.id);

  if (!gallery)
    return res.status(404).send("The gallery with the given ID was not found.");

  res.send(gallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const gallery = await Gallerys.findById(req.params.id).select("-__v");

  if (!gallery)
    return res.status(404).send("The gallery with the given ID was not found.");

  res.send(gallery);
});

module.exports = router;
