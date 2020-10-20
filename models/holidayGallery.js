const Joi = require("joi");
const mongoose = require("mongoose");

const holidayGallerySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const HolidayGallery = mongoose.model("HolidayGallery", holidayGallerySchema);

function validateHolidayGallery(holidayGallery) {
  const schema = {
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(holidayGallery, schema);
}

exports.holidayGallerySchema = holidayGallerySchema;
exports.HolidayGallery = HolidayGallery;
exports.validate = validateHolidayGallery;
