const Joi = require("joi");
const mongoose = require("mongoose");

const divingGallerySchema = new mongoose.Schema({
  name:{
    type: String,
  },
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
    name: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(divingGallery, schema);
}

exports.divingGallerySchema = divingGallerySchema;
exports.DivingGallery = DivingGallery;
exports.validate = validateDivingGallery;
