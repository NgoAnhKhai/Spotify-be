const Playlist = require("../../models/Playlist");
const { sendResponse, AppError } = require("../../helpers/utils");

const getUserPlaylist = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ userID: req.user.userId })
      .populate("userID", "username email")
      .populate("songs", "title artist")
      .exec();

    if (!playlists || playlists.length === 0) {
      throw new AppError(404, "No playlists found for this user", "NotFound");
    }

    sendResponse(
      res,
      200,
      true,
      { playlists },
      null,
      "User playlists fetched successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getUserPlaylist;
