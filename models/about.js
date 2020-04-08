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
  aboutImage: {
    type: String,
  },
  aboutImageID: {
    type: String,
  },
});

const Abouts = mongoose.model("Abouts", aboutSchema);

function validateAbout(about) {
  const schema = {
    heading: Joi.string().min(5).required(),
    body: Joi.string().min(5).required(),
    aboutImage: Joi.string().allow("").optional(),
    aboutImageID: Joi.string().allow("").optional(),
  };

  return Joi.validate(about, schema);
}

exports.aboutSchema = aboutSchema;
exports.Abouts = Abouts;
exports.validate = validateAbout;
