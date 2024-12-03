const Joi = require("joi");

const commonSchema = Joi.object({
  title: Joi.string()
    .pattern(/^[A-Za-z0-9 ]+$/) // Chỉ cho phép chữ cái, số và khoảng trắng
    .min(3)
    .required()
    .error(
      new Error(
        '"Title" must be a string with at least 3 characters and can only contain letters, numbers and spaces'
      )
    ),

  releaseDate: Joi.date()
    .optional()
    .error(new Error('"Release Date" must be a valid date')),

  artistID: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .error(
      new Error('"ArtistID" must be a valid 24-character hexadecimal string')
    ),

  genreID: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .optional()
    .error(new Error('"GenreID" must be an array of valid genre IDs')),

  coverImageURL: Joi.string()
    .uri()
    .optional()
    .error(new Error('"CoverImageURL" must be a valid URL')),

  listSong: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .optional()
    .error(new Error('"ListSong" must be an array of valid song IDs')),

  description: Joi.string()
    .min(3)
    .optional()
    .error(
      new Error('"Description" must be a string with at least 3 characters')
    ),

  userID: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .error(
      new Error('"UserID" must be a valid 24-character hexadecimal string')
    ),

  playlistID: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .error(
      new Error('"PlaylistID" must be a valid 24-character hexadecimal string')
    ),
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(
      new Error('"Username" must be a string between 3 and 30 characters')
    ),

  email: Joi.string()
    .pattern(/^[a-zA-Z0-9]+@(gmail\.com|hotmail\.com)$/)
    .required()
    .error(new Error('"Email" must be a valid email address with @')),

  passwordHash: Joi.string()
    .required()
    .error(new Error('"PasswordHash" is required and must be a valid hash')),

  name: Joi.string()
    .min(3)
    .required()
    .error(new Error('"Name" must be a string with at least 3 characters')),
});

module.exports = commonSchema;
