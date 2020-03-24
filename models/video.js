const Joi = require("joi");
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  video: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  body: {
    type: String,
    required: true,
    minlength: 5
  }
});

const Videos = mongoose.model("Videos", videoSchema);

function validateVideo(video) {
  const schema = {
    heading: Joi.string()
      .min(5)
      .max(50)
      .required(),
    video: Joi.string()
      .min(5)
      .max(50)
      .required(),
    body: Joi.string()
      .allow("")
      .optional()
  };

  return Joi.validate(video, schema);
}

exports.videoSchema = videoSchema;
exports.Videos = Videos;
exports.validate = validateVideo;
