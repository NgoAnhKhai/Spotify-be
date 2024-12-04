const { sendResponse, AppError } = require("../../helpers/utils");
const Genre = require("../../models/genre");

const updateGenre = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const genre = await Genre.findById(id);

    if (!genre) {
      throw new AppError(404, "Genre not found", "NotFound");
    }

    genre.name = name || genre.name;
    genre.description = description || genre.description;

    await genre.save();

    sendResponse(
      res,
      200,
      true,
      { genre },
      null,
      "Genre updated successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = updateGenre;
