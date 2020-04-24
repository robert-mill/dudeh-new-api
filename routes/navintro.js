const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { NavIntros, validate } = require("../models/navintro");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const navintros = await NavIntros.find().select("-__v");
  res.send(navintros);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let navintro = new NavIntros({
    heading: req.body.heading,
    body: req.body.body,
  });
  navintro = await navintro.save();

  res.send(navintro);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const navintro = await NavIntros.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
    },
    {
      new: true,
    }
  );

  if (!navintro)
    return res
      .status(404)
      .send("The navintro with the given ID was not found.");

  res.send(navintro);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const navintro = await NavIntros.findByIdAndRemove(req.params.id);

  if (!navintro)
    return res
      .status(404)
      .send("The navintro with the given ID was not found.");

  res.send(navintro);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const navintro = await NavIntros.findById(req.params.id).select("-__v");

  if (!navintro)
    return res
      .status(404)
      .send("The navintro with the given ID was not found.");

  res.send(navintro);
});

module.exports = router;
