const Joi = require("joi");

const createSongValidator = Joi.object({
  title: Joi.string().min(1).max(255).required(),

  duration: Joi.number().positive().required(),

  popularity: Joi.number().min(0).default(0),

  artistID: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  albumID: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),
  genreID: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .required(),
  URL: Joi.string().uri().required(),
});

module.exports = createSongValidator;
