const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { NewsArticle, validate } = require("../models/newsArticle");
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

  let newsArticle = new NewsArticle({
    heading: req.body.heading,
    image: req.body.image,
    newsArticle: req.body.newsArticle,
  });
  newsArticle = await newsArticle.save();

  res.send(newsArticle);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newsArticle = await NewsArticle.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      newsArticle: req.body.newsArticle,
      image: req.body.image,
    },
    {
      new: true,
    }
  );

  if (!newsArticle)
    return res
      .status(404)
      .send("The newsArticle with the given ID was not found.");

  res.send(newsArticle);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const newsArticle = await NewsArticle.findByIdAndRemove(req.params.id);

  if (!newsArticle)
    return res
      .status(404)
      .send("The newsArticle with the given ID was not found.");

  res.send(newsArticle);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const newsArticle = await NewsArticle.findById(req.params.id).select("-__v");

  if (!newsArticle)
    return res
      .status(404)
      .send("The newsArticle with the given ID was not found.");

  res.send(newsArticle);
});

module.exports = router;
