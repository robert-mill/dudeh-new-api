const Joi = require("joi");
const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  music: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const Music = mongoose.model("Music", musicSchema);

function validateMusic(music) {
  const schema = {
    music: Joi.string().allow("").optional(),
    caption: Joi.string().allow("").optional(),
  };

  return Joi.validate(music, schema);
}

exports.musicSchema = musicSchema;
exports.Music = Music;
exports.validate = validateMusic;
