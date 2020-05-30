const Joi = require("joi");
const mongoose = require("mongoose");

const divingGroupSchema = new mongoose.Schema({
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

const DivingGroup = mongoose.model("DivingGroup", divingGroupSchema);

function validateDivingGroup(divingGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(divingGroup, schema);
}

exports.divingGroupSchema = divingGroupSchema;
exports.DivingGroup = DivingGroup;
exports.validate = validateDivingGroup;
