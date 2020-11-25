const Joi = require("joi");
const mongoose = require("mongoose");

const profileGroupSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  video: {
    type: String,
  },
  videoCaption: {
    type: String,
  },
});

const ProfileGroup = mongoose.model("ProfileGroup", profileGroupSchema);

function validateProfileGroup(profileGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(profileGroup, schema);
}

exports.profileGroupSchema = profileGroupSchema;
exports.ProfileGroup = ProfileGroup;
exports.validate = validateProfileGroup;
