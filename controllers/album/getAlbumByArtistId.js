const { AppError, sendResponse } = require("../../helpers/utils");
const Album = require("../../models/Album");

const getAlbumsByArtist = async (req, res, next) => {
  const { artistID } = req.params;

  try {
    const albums = await Album.find({ artistID }).populate("listSong");
    if (!albums || albums.length === 0) {
      throw new AppError("No albums found for this artist", 404);
    }

    sendResponse(
      res,
      200,
      true,
      { albums },
      null,
      "Albums fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getAlbumsByArtist;
