const Joi = require("joi");
const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Cv = mongoose.model("Cv", cvSchema);

function validateCv(cv) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
  };

  return Joi.validate(cv, schema);
}

exports.cvSchema = cvSchema;
exports.Cv = Cv;
exports.validate = validateCv;
