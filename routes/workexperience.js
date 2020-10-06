const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { WorkExperience, validate } = require("../models/workexperience");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const workexperiences = await WorkExperience.find().select("-__v");
  res.send(workexperiences);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let workexperience = new WorkExperience({
    heading: req.body.heading,
    body: req.body.body,
  });
  workexperience = await workexperience.save();

  res.send(workexperience);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const workexperience = await WorkExperience.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
    },
    {
      new: true,
    }
  );

  if (!workexperience)
    return res
      .status(404)
      .send("The workexperience with the given ID was not found.");

  res.send(workexperience);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const workexperience = await WorkExperience.findByIdAndRemove(req.params.id);

  if (!workexperience)
    return res
      .status(404)
      .send("The workexperience with the given ID was not found.");

  res.send(workexperience);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const workexperience = await WorkExperience.findById(req.params.id).select(
    "-__v"
  );

  if (!workexperience)
    return res
      .status(404)
      .send("The workexperience with the given ID was not found.");

  res.send(workexperience);
});

module.exports = router;
