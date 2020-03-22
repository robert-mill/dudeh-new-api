const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const homeMainSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  body: {
    type: String,
    required: true,
    minlength: 5
  }
});
HomeMain = mongoose.model("HomeMain", homeMainSchema);
function validateMainHome(home) {
  const schema = {
    heading: Joi.string()
      .min(5)
      .max(200)
      .required(),
    body: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(home, schema);
}
exports.HomeMain = HomeMain;
exports.validate = validateMainHome;
