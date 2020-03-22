const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { HomeMain, validate } = require("../models/homeMain");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const homeMain = await HomeMain.find();
  res.send(homeMain).select("-__v");
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let homeMain = new HomeMain({
    heading: req.body.heading,
    body: req.body.body
  });
  homeMain = await homeMain.save();

  res.send(homeMain);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const homeMain = await HomeMain.findByIdAndUpdate(
    req.params.id,
    { heading: req.body.heading, body: req.body.body },
    {
      new: true
    }
  );

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const homeMain = await HomeMain.findByIdAndRemove(req.params.id);

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const homeMain = await HomeMain.findById(req.params.id).select("-__v");

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

module.exports = router;
