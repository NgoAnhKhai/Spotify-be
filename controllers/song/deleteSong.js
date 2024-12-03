const { AppError, sendResponse } = require("../../helpers/utils");
const Song = require("../../models/song");

const deleteSong = async (req, res, next) => {
  const { id } = req.params;

  try {
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      throw new AppError("Song not found", 404);
    }

    sendResponse(res, 200, true, { song }, null, "Song deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = deleteSong;
