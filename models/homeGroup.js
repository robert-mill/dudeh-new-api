const Joi = require("joi");
const mongoose = require("mongoose");

const homeGroupSchema = new mongoose.Schema({
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

const HomeGroup = mongoose.model("HomeGroup", homeGroupSchema);

function validateHome(homeGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(homeGroup, schema);
}

exports.homeGroupSchema = homeGroupSchema;
exports.HomeGroup = HomeGroup;
exports.validate = validateHomeGroup;
