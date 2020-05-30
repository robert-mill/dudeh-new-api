const Joi = require("joi");
const mongoose = require("mongoose");

const divingSchema = new mongoose.Schema({
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

const Diving = mongoose.model("Diving", divingSchema);

function validateDiving(diving) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(diving, schema);
}

exports.divingSchema = divingSchema;
exports.Diving = Diving;
exports.validate = validateDiving;
