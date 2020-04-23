const Joi = require("joi");
const mongoose = require("mongoose");

const homeMainSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  imageID: {
    type: String,
  },
});

const HomeMain = mongoose.model("HomeMain", homeMainSchema);

function validateHomeMain(home) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    imageID: Joi.string().allow("").optional(),
  };

  return Joi.validate(home, schema);
}

exports.homeMainSchema = homeMainSchema;
exports.HomeMain = HomeMain;
exports.validate = validateHomeMain;
