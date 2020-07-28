const Joi = require("joi");
const mongoose = require("mongoose");

const rugbyGallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const RugbyGallery = mongoose.model("RugbyGallery", rugbyGallerySchema);

function validateRugbyGallery(rugbyGallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(rugbyGallery, schema);
}

exports.rugbyGallerySchema = rugbyGallerySchema;
exports.RugbyGallery = RugbyGallery;
exports.validate = validateRugbyGallery;
