const Joi = require("joi");
const mongoose = require("mongoose");

const swimminghGallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const SwimmingGallery = mongoose.model(
  "SwimmingGallery",
  swimminghGallerySchema
);

function validateSwimmingGallery(swimminghGallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(swimminghGallery, schema);
}

exports.swimminghGallerySchema = swimminghGallerySchema;
exports.SwimmingGallery = SwimmingGallery;
exports.validate = validateSwimmingGallery;
