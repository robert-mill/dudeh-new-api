const Joi = require("joi");
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

function Gallery(gallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(gallery, schema);
}

exports.gallerySchema = gallerySchema;
exports.Gallery = Gallery;
exports.validate = Gallery;
