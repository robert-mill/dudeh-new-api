const Joi = require("joi");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  heading: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  body: {
    type: String,
    minlength: 5,
  },
});

const Contacts = mongoose.model("Contacts", contactSchema);

function validateAbout(contact) {
  const schema = {
    heading: Joi.string().min(5).required(),
    body: Joi.string().min(5).required(),
  };

  return Joi.validate(contact, schema);
}

exports.contactSchema = acontactSchema;
exports.Contacts = Contacts;
exports.validate = validateAbout;
