const { sendResponse, AppError } = require("../../helpers/utils");
const Song = require("../../models/song");

const getAllSong = async (req, res, next) => {
  try {
    const song = await Song.find();
    if (!song || song.length === 0) {
      return sendResponse(res, 404, false, null, null, "No found");
    }
    sendResponse(res, 200, true, { songs: song }, null, "Successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = getAllSong;
