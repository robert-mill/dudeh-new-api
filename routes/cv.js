const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Cv, validate } = require("../models/cv");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const cvs = await Cv.find().select("-__v");
  res.send(cvs);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let cv = new Cv({
    heading: req.body.heading,
    body: req.body.body,
  });
  cv = await cv.save();

  res.send(cv);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cv = await Cv.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
    },
    {
      new: true,
    }
  );

  if (!cv)
    return res.status(404).send("The cv with the given ID was not found.");

  res.send(cv);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const cv = await Cv.findByIdAndRemove(req.params.id);

  if (!cv)
    return res.status(404).send("The cv with the given ID was not found.");

  res.send(cv);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const cv = await Cv.findById(req.params.id).select("-__v");

  if (!cv)
    return res.status(404).send("The cv with the given ID was not found.");

  res.send(cv);
});

module.exports = router;
