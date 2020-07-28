const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { RugbyGallery, validate } = require("../models/rugbyGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rugbyGallerys = await RugbyGallery.find().select("-__v");
  res.send(rugbyGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let rugbyGallery = new RugbyGallery({
    image: req.body.image,
    caption: req.body.caption,
  });
  rugbyGallery = await rugbyGallery.save();

  res.send(rugbyGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rugbyGallery = await RugbyGallery.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!rugbyGallery)
    return res
      .status(404)
      .send("The rugbyGallery with the given ID was not found.");

  res.send(rugbyGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const rugbyGallery = await RugbyGallery.findByIdAndRemove(req.params.id);

  if (!rugbyGallery)
    return res
      .status(404)
      .send("The rugbyGallery with the given ID was not found.");

  res.send(rugbyGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const rugbyGallery = await RugbyGallery.findById(req.params.id).select(
    "-__v"
  );

  if (!rugbyGallery)
    return res
      .status(404)
      .send("The rugbyGallery with the given ID was not found.");

  res.send(rugbyGallery);
});

module.exports = router;
