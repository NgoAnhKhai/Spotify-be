const { AppError, sendResponse } = require("../../helpers/utils");
const Song = require("../../models/song");

const updateSong = async (req, res, next) => {
  const songId = req.params.id;
  const updatedInfo = req.body;

  if (!updatedInfo) {
    throw new AppError("Please provide song information to update", 400);
  }

  try {
    const song = await Song.findById(songId);

    if (!song) {
      throw new AppError("Song not found", 404);
    }

    const existingSong = await Song.findOne({
      title: updatedInfo.title,
      artistID: updatedInfo.artistID,
      _id: { $ne: songId },
    });

    if (existingSong) {
      throw new AppError(
        "Song already exists with the same title and artist",
        400
      );
    }

    song.title = updatedInfo.title || song.title;
    song.artistID = updatedInfo.artistID || song.artistID;
    song.genreID = updatedInfo.genreID || song.genreID;
    song.duration = updatedInfo.duration || song.duration;
    song.popularity = updatedInfo.popularity || song.popularity;
    song.URL = updatedInfo.URL || song.URL;

    await song.save();

    await song.populate({
      path: "genreID",
      model: "Genre",
      select: "name description",
    });

    sendResponse(res, 200, true, { song }, null, "Song updated successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = updateSong;
