const { sendResponse, AppError } = require("../../helpers/utils");
const Song = require("../../models/song");
const Album = require("../../models/Album");

const addSongToAlbum = async (req, res, next) => {
  const { id } = req.params;
  const { albumID } = req.body;

  if (!albumID) {
    throw new AppError("Please provide albumID", 400);
  }

  try {
    const song = await Song.findById(id);
    if (!song) {
      throw new AppError("Song not found", 404);
    }

    const album = await Album.findById(albumID);
    if (!album) {
      throw new AppError("Album not found", 404);
    }

    song.albumID = albumID;
    await song.save();

    if (!album.listSong.includes(id)) {
      album.listSong.push(id);
      await album.save();
    }

    sendResponse(
      res,
      200,
      true,
      { song, album },
      null,
      "Song added to album successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = addSongToAlbum;
