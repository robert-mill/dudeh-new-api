const Joi = require("joi");
const mongoose = require("mongoose");

const ImageBlockSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const ImageBlock = mongoose.model("ImageBlock", ImageBlockSchema);

function validateEvent(imageBlock) {
  const schema = {
    image: Joi.string().allow("").optional(),
  };

  return Joi.validate(imageBlock, schema);
}

exports.ImageBlockSchema = ImageBlockSchema;
exports.ImageBlock = ImageBlock;
exports.validate = validateEvent;
