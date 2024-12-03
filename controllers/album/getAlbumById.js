const { AppError, sendResponse } = require("../../helpers/utils");
const Album = require("../../models/Album");

const getAlbumById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id).populate("artistID listSong");
    if (!album) {
      throw new AppError("Album not found", 404);
    }

    sendResponse(res, 200, true, { album }, null, "Album fetched successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = getAlbumById;
