const Joi = require("joi");
const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
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
  Music: {
    type: String,
  },
  MusicCaption: {
    type: String,
  },
});

const Music = mongoose.model("Music", musicSchema);

function validateMusic(music) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    body: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
    Music: Joi.string().allow("").optional(),
    MusicCaption: Joi.string().allow("").optional(),
  };

  return Joi.validate(music, schema);
}

exports.musicSchema = musicSchema;
exports.Music = Music;
exports.validate = validateMusic;
