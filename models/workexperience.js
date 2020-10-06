const Joi = require("joi");
const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
});

const WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);

function validateWorkExperience(workExperience) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
  };

  return Joi.validate(workExperience, schema);
}

exports.workExperienceSchema = workExperienceSchema;
exports.WorkExperience = WorkExperience;
exports.validate = validateWorkExperience;
