const Joi = require("joi");
const mongoose = require("mongoose");

const aboutGroupSchema = new mongoose.Schema({
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
});

const AboutGroup = mongoose.model("AboutGroup", aboutGroupSchema);

function validateAboutGroup(aboutGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(aboutGroup, schema);
}

exports.aboutGroupSchema = aboutGroupSchema;
exports.AboutGroup = AboutGroup;
exports.validate = validateAboutGroup;
