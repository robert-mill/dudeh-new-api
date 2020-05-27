const Joi = require("joi");
const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  body: {
    type: String,
    minlength: 5,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const About = mongoose.model("About", aboutSchema);

function validateAbout(about) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(about, schema);
}

exports.aboutSchema = aboutSchema;
exports.About = About;
exports.validate = validateAbout;
