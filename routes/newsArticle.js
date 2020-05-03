const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { NewsArticle, validate } = require("../models/newArticle");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const newsArticles = await NewsArticle.find().select("-__v");
  res.send(newsArticles);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let homeMain = new NewsArticle({
    heading: req.body.heading,
    nenwsArticle: req.body.nenwsArticle,
  });
  homeMain = await homeMain.save();

  res.send(homeMain);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const homeMain = await NewsArticle.findByIdAndUpdate(
    req.params.id,
    { heading: req.body.heading, nenwsArticle: req.body.nenwsArticle },
    {
      new: true,
    }
  );

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const homeMain = await NewsArticle.findByIdAndRemove(req.params.id);

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const homeMain = await NewsArticle.findById(req.params.id).select("-__v");

  if (!homeMain)
    return res
      .status(404)
      .send("The homeMain with the given ID was not found.");

  res.send(homeMain);
});

module.exports = router;
