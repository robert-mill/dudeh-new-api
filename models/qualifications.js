const Joi = require("joi");
const mongoose = require("mongoose");

const qualificationsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  grade: {
    type: String,
  },
  location: {
    type: String,
  },
});

const Qualifications = mongoose.model("Qualifications", qualificationsSchema);

function validateQualifications(qualifications) {
  const schema = {
    title: Joi.string().allow("").optional(),
    description: Joi.string().allow("").optional(),
    grade: Joi.string().allow("").optional(),
    location: Joi.string().allow("").optional(),
  };

  return Joi.validate(qualifications, schema);
}

exports.qualificationsSchema = qualificationsSchema;
exports.Qualifications = Qualifications;
exports.validate = validateQualifications;
