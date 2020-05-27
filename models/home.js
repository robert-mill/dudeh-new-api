const Joi = require("joi");
const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
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

const Home = mongoose.model("Home", homeSchema);

function validateHome(home) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(home, schema);
}

exports.homeSchema = homeSchema;
exports.Home = Home;
exports.validate = validateHome;
