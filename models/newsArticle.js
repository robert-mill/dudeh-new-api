const Joi = require("joi");
const mongoose = require("mongoose");

const newsArticleSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  nenwsArticle: {
    type: String,
  },
});

const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);

function validateEvent(newsArticle) {
  const schema = {
    heading: Joi.string().allow("").optional(),
    nenwsArticle: Joi.string().allow("").optional(),
  };

  return Joi.validate(newsArticle, schema);
}

exports.newsArticleSchema = newsArticleSchema;
exports.NewsArticle = NewsArticle;
exports.validate = validateEvent;