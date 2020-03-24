const Joi = require("joi");
const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  body: {
    type: String,
    required: true,
    minlength: 5
  }
});

const Abouts = mongoose.model("Abouts", aboutSchema);

function validateAbout(about) {
  const schema = {
    heading: Joi.string()
      .min(5)
      .max(50)
      .required(),
    body: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(about, schema);
}

exports.aboutSchema = aboutSchema;
exports.Abouts = Abouts;
exports.validate = validateAbout;
