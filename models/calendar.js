const Joi = require("joi");
const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  title: { type: String },
  start: { type: String },
  end: { type: String },
  allDay: { type: Boolean },
  extendedProps: { type: String },
  classNames: { type: String },
  backgroundColor: { type: String },
  borderColor: { type: String },
  textColor: { type: String },
  description: { type: String },
  url: { type: String },
});

const Calendar = mongoose.model("calendar", CalendarSchema);

function validateCalendar(calendar) {
  const schema = {
    title: Joi.string().allow("").optional(),
    start: Joi.string().allow("").optional(),
    end: Joi.string().allow("").optional(),
    allDay: Joi.boolean().default(false),
    extendedProps: Joi.string().allow("").optional(),
    classNames: Joi.string().allow("").optional(),
    backgroundColor: Joi.string().allow("").optional(),
    borderColor: Joi.string().allow("").optional(),
    textColor: Joi.string().allow("").optional(),
    description: Joi.string().allow("").optional(),
    url: Joi.string().allow("").optional(),
  };

  return Joi.validate(calendar, schema);
}

exports.CalendarSchema = CalendarSchema;
exports.Calendar = Calendar;
exports.validate = validateCalendar;
