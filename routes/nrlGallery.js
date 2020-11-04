const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { NrlGallery, validate } = require("../models/nrlGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const nrlGallerys = await NrlGallery.find().select("-__v");
  res.send(nrlGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let nrlGallery = new NrlGallery({
    name: req.body.name,
    image: req.body.image,
    caption: req.body.caption,
  });
  nrlGallery = await nrlGallery.save();

  res.send(nrlGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const nrlGallery = await NrlGallery.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!nrlGallery)
    return res
      .status(404)
      .send("The nrlGallery with the given ID was not found.");

  res.send(nrlGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const nrlGallery = await NrlGallery.findByIdAndRemove(req.params.id);

  if (!nrlGallery)
    return res
      .status(404)
      .send("The nrlGallery with the given ID was not found.");

  res.send(nrlGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const nrlGallery = await NrlGallery.findById(req.params.id).select("-__v");

  if (!nrlGallery)
    return res
      .status(404)
      .send("The nrlGallery with the given ID was not found.");

  res.send(nrlGallery);
});

module.exports = router;
