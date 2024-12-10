const Joi = require("joi");

const createPlaylistSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),

  userID: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  description: Joi.string().max(500).optional(),

  songs: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),
  creationDate: Joi.date().optional(),
});

module.exports = createPlaylistSchema;
