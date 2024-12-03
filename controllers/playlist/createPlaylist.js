const { AppError, sendResponse } = require("../../helpers/utils");
const Playlist = require("../../models/Playlist");
const User = require("../../models/user");

const createPlaylist = async (req, res, next) => {
  try {
    const { title, userID, songs } = req.body;

    if (!title || !userID) {
      throw new AppError("Playlist title and userId are required", 400);
    }

    const userExists = await User.findById(userID);
    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    const playlist = await Playlist.create({ title, userID, songs });

    sendResponse(
      res,
      200,
      true,
      { playlist },
      null,
      "Created playlist successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = createPlaylist;
