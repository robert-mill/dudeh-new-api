const Joi = require("joi");
const mongoose = require("mongoose");

const ContactRequestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bodyText: {
    type: String,
    required: true,
  },
});

const ContactRequest = mongoose.model("contactRequest", ContactRequestSchema);

function validateDuHome(contactRequest) {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    bodyText: Joi.string().required(),
  };

  return Joi.validate(contactRequest, schema);
}

exports.ContactRequestSchema = ContactRequestSchema;
exports.ContactRequest = ContactRequest;
exports.validate = validateDuHome;
