const { sendResponse, AppError } = require("../../helpers/utils");
const Playlist = require("../../models/Playlist");

const getAllPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.find();
    if (!playlist || playlist.length === 0) {
      return sendResponse(res, 404, false, null, null, "No found");
    }
    sendResponse(res, 200, true, { playlists: playlist }, null, "Successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = getAllPlaylist;
