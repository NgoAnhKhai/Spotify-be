const { AppError, sendResponse } = require("../../helpers/utils");
const Playlist = require("../../models/Playlist");

const getPlaylistById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const playlist = await Playlist.findById(id).populate("songs");
    if (!playlist) {
      throw new AppError("Playlist not found", 404);
    }
    sendResponse(
      res,
      200,
      true,
      { playlist },
      null,
      "Playlist retrived successfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = getPlaylistById;
