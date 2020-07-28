const Joi = require("joi");
const mongoose = require("mongoose");

const nrlGallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const NrlGallery = mongoose.model("NrlGallery", nrlGallerySchema);

function validateNrlGallery(nrlGallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(nrlGallery, schema);
}

exports.nrlGallerySchema = nrlGallerySchema;
exports.NrlGallery = NrlGallery;
exports.validate = validateNrlGallery;
