const Joi = require("joi");
const mongoose = require("mongoose");

const ImageBlockTwoSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const imageBlockTwo = mongoose.model("imageBlockTwo", ImageBlockTwoSchema);

function validateEvent(imageBlock) {
  const schema = {
    image: Joi.string().allow("").optional(),
  };

  return Joi.validate(imageBlock, schema);
}

exports.ImageBlockTwoSchema = ImageBlockTwoSchema;
exports.imageBlockTwo = imageBlockTwo;
exports.validate = validateEvent;
