const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Gallery, validate } = require("../models/gallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const gallerys = await Gallery.find().select("-__v");
  res.send(gallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let gallery = new Gallery({
    image: req.body.image,
    caption: req.body.caption,
  });
  gallery = await gallery.save();

  res.send(gallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gallery = await Gallery.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      caption: req.body.caption,
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
  const gallery = await Gallery.findByIdAndRemove(req.params.id);

  if (!gallery)
    return res.status(404).send("The gallery with the given ID was not found.");

  res.send(gallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const gallery = await Gallery.findById(req.params.id).select("-__v");

  if (!gallery)
    return res.status(404).send("The gallery with the given ID was not found.");

  res.send(gallery);
});

module.exports = router;
