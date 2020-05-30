const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { DivingGallery, validate } = require("../models/divingGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const divingGallerys = await DivingGallery.find().select("-__v");
  res.send(divingGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let divingGallery = new DivingGallery({
    image: req.body.image,
    caption: req.body.caption,
  });
  divingGallery = await divingGallery.save();

  res.send(divingGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const divingGallery = await DivingGallery.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      caption: req.body.caption,
    },
    {
      new: true,
    }
  );

  if (!divingGallery)
    return res
      .status(404)
      .send("The divingGallery with the given ID was not found.");

  res.send(divingGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const divingGallery = await DivingGallery.findByIdAndRemove(req.params.id);

  if (!divingGallery)
    return res
      .status(404)
      .send("The divingGallery with the given ID was not found.");

  res.send(divingGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const divingGallery = await DivingGallery.findById(req.params.id).select(
    "-__v"
  );

  if (!divingGallery)
    return res
      .status(404)
      .send("The divingGallery with the given ID was not found.");

  res.send(divingGallery);
});

module.exports = router;
