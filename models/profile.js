const Joi = require("joi");
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
 
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

function validateProfile(profile) {
  const schema = {
   
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(profile, schema);
}

exports.profileSchema = profileSchema;
exports.Profile = Profile;
exports.validate = validateProfile;
