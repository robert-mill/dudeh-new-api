const Joi = require("joi");
const mongoose = require("mongoose");

const homeMainSchema = new mongoose.Schema({
  heaading: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  body: {
    type: String,
    remoquired: true,
    minlength: 5
  }
});

const HomeMain = mongoose.model("HomeMain", homeMainSchema);

function validateHomeMain(home) {
  const schema = {
    heading: Joi.string()
      .min(5)
      .max(50)
      .required(),
    body: Joi.string()
      .minlength(5)
      .required()
  };

  return Joi.validate(home, schema);
}

exports.homeMainSchema = homeMainSchema;
exports.HomeMain = HomeMain;
exports.validate = validateHomeMain;
