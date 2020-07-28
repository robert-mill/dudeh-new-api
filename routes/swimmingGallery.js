const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { SwimmingGallery, validate } = require("../models/swimmingGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const swimmingGallerys = await SwimmingGallery.find().select("-__v");
  res.send(swimmingGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let swimmingGallery = new SwimmingGallery({
    image: req.body.image,
    caption: req.body.caption,
  });
  swimmingGallery = await swimmingGallery.save();

  res.send(swimmingGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const swimmingGallery = await SwimmingGallery.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!swimmingGallery)
    return res
      .status(404)
      .send("The swimmingGallery with the given ID was not found.");

  res.send(swimmingGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const swimmingGallery = await SwimmingGallery.findByIdAndRemove(
    req.params.id
  );

  if (!swimmingGallery)
    return res
      .status(404)
      .send("The swimmingGallery with the given ID was not found.");

  res.send(swimmingGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const swimmingGallery = await SwimmingGallery.findById(req.params.id).select(
    "-__v"
  );

  if (!swimmingGallery)
    return res
      .status(404)
      .send("The swimmingGallery with the given ID was not found.");

  res.send(swimmingGallery);
});

module.exports = router;
