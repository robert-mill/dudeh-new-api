const Joi = require("joi");
const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Interest = mongoose.model("Interest", interestSchema);

function validateInterest(interest) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
  };

  return Joi.validate(interest, schema);
}

exports.interestSchema = interestSchema;
exports.Interest = Interest;
exports.validate = validateInterest;
