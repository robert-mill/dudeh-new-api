const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { AboutGallery, validate } = require("../models/aboutGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const aboutGallerys = await AboutGallery.find().select("-__v");
  res.send(aboutGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let aboutGallery = new AboutGallery({
    image: req.body.image,
    caption: req.body.caption,
  });
  aboutGallery = await aboutGallery.save();

  res.send(aboutGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const aboutGallery = await AboutGallery.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!aboutGallery)
    return res
      .status(404)
      .send("The aboutGallery with the given ID was not found.");

  res.send(aboutGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const aboutGallery = await AboutGallery.findByIdAndRemove(req.params.id);

  if (!aboutGallery)
    return res
      .status(404)
      .send("The aboutGallery with the given ID was not found.");

  res.send(aboutGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const aboutGallery = await AboutGallery.findById(req.params.id).select(
    "-__v"
  );

  if (!aboutGallery)
    return res
      .status(404)
      .send("The aboutGallery with the given ID was not found.");

  res.send(aboutGallery);
});

module.exports = router;
