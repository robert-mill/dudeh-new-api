const Joi = require("joi");
const mongoose = require("mongoose");

const swimmingSchema = new mongoose.Schema({
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

const Swimming = mongoose.model("Swimming", swimmingSchema);

function validateSwimming(swimming) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(swimming, schema);
}

exports.swimmingSchema = swimmingSchema;
exports.Swimming = Swimming;
exports.validate = validateSwimming;
