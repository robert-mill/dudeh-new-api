const Joi = require("joi");
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  body: {
    type: String,
  },
  videoLink: {
    type: String,
  },
});

const Videos = mongoose.model("Videos", videoSchema);

function validateAbout(video) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    videoLink: Joi.string().allow("").optional(),
  };

  return Joi.validate(video, schema);
}

exports.videoSchema = videoSchema;
exports.Videos = Videos;
exports.validate = validateAbout;
