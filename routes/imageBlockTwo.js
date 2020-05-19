const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { ImageBlock, validate } = require("../models/imageBlockTwo");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const imageBlocks = await ImageBlock.find().select("-__v");
  res.send(imageBlocks);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let imageBlock = new ImageBlock({
    image: req.body.image,
  });
  imageBlock = await imageBlock.save();

  res.send(imageBlock);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const imageBlock = await ImageBlock.findByIdAndUpdate(
    req.params.id,
    { image: req.body.image },
    {
      new: true,
    }
  );

  if (!imageBlock)
    return res
      .status(404)
      .send("The imageBlock with the given ID was not found.");

  res.send(imageBlock);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const imageBlock = await ImageBlock.findByIdAndRemove(req.params.id);

  if (!imageBlock)
    return res
      .status(404)
      .send("The imageBlock with the given ID was not found.");

  res.send(imageBlock);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const imageBlock = await ImageBlock.findById(req.params.id).select("-__v");

  if (!imageBlock)
    return res
      .status(404)
      .send("The imageBlock with the given ID was not found.");

  res.send(imageBlock);
});

module.exports = router;
