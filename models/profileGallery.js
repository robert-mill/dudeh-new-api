const Joi = require("joi");
const mongoose = require("mongoose");

const profileGallerySchema = new mongoose.Schema({
  name:{
    type: String,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  order:{
    type: Number,
  },
});

const ProfileGallery = mongoose.model("ProfileGallery", profileGallerySchema);

function validateProfileGallery(profileGallery) {
  const schema = {
    name: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    order: Joi.number().allow("").optional(),
  };

  return Joi.validate(profileGallery, schema);
}

exports.profileGallerySchema = profileGallerySchema;
exports.ProfileGallery = ProfileGallery;
exports.validate = validateProfileGallery;
