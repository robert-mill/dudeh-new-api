const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { HolidayGallery, validate } = require("../models/holidayGallery");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const holidayGallerys = await HolidayGallery.find().select("-__v");
  res.send(holidayGallerys);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let holidayGallery = new HolidayGallery({
    name: req.body.name,
    image: req.body.image,
    caption: req.body.caption,
  });
  holidayGallery = await holidayGallery.save();

  res.send(holidayGallery);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const holidayGallery = await HolidayGallery.findByIdAndUpdate(
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

  if (!holidayGallery)
    return res
      .status(404)
      .send("The holidayGallery with the given ID was not found.");

  res.send(holidayGallery);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const holidayGallery = await HolidayGallery.findByIdAndRemove(req.params.id);

  if (!holidayGallery)
    return res
      .status(404)
      .send("The holidayGallery with the given ID was not found.");

  res.send(holidayGallery);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const holidayGallery = await HolidayGallery.findById(req.params.id).select(
    "-__v"
  );

  if (!holidayGallery)
    return res
      .status(404)
      .send("The holidayGallery with the given ID was not found.");

  res.send(holidayGallery);
});

module.exports = router;
