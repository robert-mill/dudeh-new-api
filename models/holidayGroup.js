const Joi = require("joi");
const mongoose = require("mongoose");

const holidayGroupSchema = new mongoose.Schema({
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

const HolidayGroup = mongoose.model("HolidayGroup", holidayGroupSchema);

function validateHolidayGroup(holidayGroup) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    video: Joi.string().allow("").optional(),
    videoCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(holidayGroup, schema);
}

exports.holidayGroupSchema = holidayGroupSchema;
exports.HolidayGroup = HolidayGroup;
exports.validate = validateHolidayGroup;
