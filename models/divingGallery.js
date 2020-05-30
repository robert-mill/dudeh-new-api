const Joi = require("joi");
const mongoose = require("mongoose");

const divingGallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const DivingGallery = mongoose.model("DivingGallery", divingGallerySchema);

function validateDivingGallery(divingGallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(divingGallery, schema);
}

exports.divingGallerySchema = divingGallerySchema;
exports.DivingGallery = DivingGallery;
exports.validate = validateDivingGallery;
