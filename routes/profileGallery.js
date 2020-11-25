const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { ProfileGallery, validate } = require("../models/profileGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const profileGallerys = await ProfileGallery.find().select("-__v");
  res.send(profileGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profileGallery = new ProfileGallery({
    name: req.body.name,
    image: req.body.image,
    caption: req.body.caption,
    order: req.body.order,
  });
  profileGallery = await profileGallery.save();

  res.send(profileGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const profileGallery = await ProfileGallery.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      caption: req.body.caption,
      order: req.body.order,
    },
    {
      new: true,
    }
  );

  if (!profileGallery)
    return res
      .status(404)
      .send("The profileGallery with the given ID was not found.");

  res.send(profileGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const profileGallery = await ProfileGallery.findByIdAndRemove(req.params.id);

  if (!profileGallery)
    return res
      .status(404)
      .send("The profileGallery with the given ID was not found.");

  res.send(profileGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const profileGallery = await ProfileGallery.findById(req.params.id).select(
    "-__v"
  );

  if (!profileGallery)
    return res
      .status(404)
      .send("The profileGallery with the given ID was not found.");

  res.send(profileGallery);
});

module.exports = router;
