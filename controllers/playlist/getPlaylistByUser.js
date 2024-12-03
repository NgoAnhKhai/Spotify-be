const { AppError, sendResponse } = require("../../helpers/utils");
const Playlist = require("../../models/Playlist");

const getPlaylistByUserid = async (req, res, next) => {
  const { userID } = req.params;

  try {
    const playlists = await Playlist.find({ userID });

    if (!playlists || playlists.length === 0) {
      throw new AppError("No playlists found for this user", 404);
    }

    sendResponse(
      res,
      200,
      true,
      { playlists },
      null,
      "Playlist(s) fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getPlaylistByUserid;
