const Joi = require("joi");
const mongoose = require("mongoose");

const imageBlockTwoSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const ImageBlockTwo = mongoose.model("ImageBlockTwo", imageBlockTwoSchema);

function validateEvent(imageBlock) {
  const schema = {
    image: Joi.string().allow("").optional(),
  };

  return Joi.validate(imageBlock, schema);
}

exports.ImageBlockTwoSchema = ImageBlockTwoSchema;
exports.ImageBlockTwo = ImageBlockTwo;
exports.validate = validateEvent;
