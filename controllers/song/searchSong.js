const { AppError, sendResponse } = require("../../helpers/utils");
const Song = require("../../models/song");

const searchSongs = async (req, res, next) => {
  const { title } = req.query;
  try {
    const searchQuery = [];

    if (title) {
      console.log(`Searching for title: ${title}`);
      searchQuery.push({
        title: { $regex: title, $options: "i" },
      });
    }

    if (searchQuery.length === 0) {
      throw new AppError("Please provide a search query", 400);
    }

    const songs = await Song.find({ title }).sort({ createdAt: -1 });

    if (songs.length === 0) {
      throw new AppError("No songs found", 404);
    }

    sendResponse(res, 200, true, { songs }, null, "Songs found successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = searchSongs;
