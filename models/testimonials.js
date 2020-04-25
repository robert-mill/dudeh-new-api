const Joi = require("joi");
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Testimonials = mongoose.model("Testimonials", testimonialSchema);

function validateEvent(testimonial) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
  };

  return Joi.validate(testimonial, schema);
}

exports.testimonialSchema = testimonialSchema;
exports.Testimonials = Testimonials;
exports.validate = validateEvent;
