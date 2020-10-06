const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Qualifications, validate } = require("../models/qualifications");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const qualificationss = await Qualifications.find().select("-__v");
  res.send(qualificationss);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let qualifications = new Qualifications({
    title: req.body.title,
    description: req.body.description,
    grade: req.body.grade,
    location: req.body.location,
  });
  qualifications = await qualifications.save();

  res.send(qualifications);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const qualifications = await Qualifications.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      grade: req.body.grade,
      location: req.body.location,
    },
    {
      new: true,
    }
  );

  if (!qualifications)
    return res
      .status(404)
      .send("The qualifications with the given ID was not found.");

  res.send(qualifications);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const qualifications = await Qualifications.findByIdAndRemove(req.params.id);

  if (!qualifications)
    return res
      .status(404)
      .send("The qualifications with the given ID was not found.");

  res.send(qualifications);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const qualifications = await Qualifications.findById(req.params.id).select(
    "-__v"
  );

  if (!qualifications)
    return res
      .status(404)
      .send("The qualifications with the given ID was not found.");

  res.send(qualifications);
});

module.exports = router;
