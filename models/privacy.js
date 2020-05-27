const Joi = require("joi");
const mongoose = require("mongoose");

const privacySchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Privacy = mongoose.model("Privacy", privacySchema);

function validatePrivacy(privacy) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
  };

  return Joi.validate(privacy, schema);
}

exports.privacySchema = privacySchema;
exports.Privacy = Privacy;
exports.validate = validatePrivacy;
