const { AppError, sendResponse } = require("../../helpers/utils");
const Album = require("../../models/Album");

const updateAlbum = async (req, res, next) => {
  const { id } = req.params;
  const { title, artistID, songs } = req.body;

  try {
    const album = await Album.findById(id);
    if (!album) {
      throw new AppError("Album not found", 404);
    }

    album.title = title || album.title;
    album.artistID = artistID || album.artistID;
    album.songs = songs || album.songs;

    await album.save();

    sendResponse(res, 200, true, { album }, null, "Album updated successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = updateAlbum;
