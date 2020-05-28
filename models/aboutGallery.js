const Joi = require("joi");
const mongoose = require("mongoose");

const aboutGallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const AboutGallery = mongoose.model("AboutGallery", aboutGallerySchema);

function validateAboutGallery(aboutGallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(aboutGallery, schema);
}

exports.aboutGallerySchema = aboutGallerySchema;
exports.AboutGallery = AboutGallery;
exports.validate = validateAboutGallery;
