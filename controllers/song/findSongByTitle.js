const { AppError, sendResponse } = require("../../helpers/utils");
const Song = require("../../models/song");
const findSongByTitle = async (title) => {
  try {
    const song = await Song.findOne({
      title: { $regex: title, $options: "i" },
    }).populate([
      { path: "artistID", select: "name" },
      { path: "albumID", select: "title" },
      { path: "genreID", select: "name" },
    ]);

    if (!song) {
      throw new AppError("Song not found", 404);
    }

    sendResponse(
      res,
      200,
      true,
      { song },
      null,
      "find song by title successfully"
    );
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while finding the song"
    );
  }
};

module.exports = findSongByTitle;
