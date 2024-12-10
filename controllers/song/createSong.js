const { AppError, sendResponse } = require("../../helpers/utils");
const Album = require("../../models/Album");
const Artist = require("../../models/artist");
const Song = require("../../models/song");

const createSong = async (req, res, next) => {
  const info = req.body;

  if (!info) {
    throw new AppError("Please provide song information", 400);
  }

  try {
    const existingSong = await Song.findOne({
      title: info.title,
      artistID: info.artistID,
      albumID: info.albumID,
    });

    if (existingSong) {
      throw new AppError(
        "Song already exists with the same title and artist",
        400
      );
    }

    const song = await Song.create(info);

    const artist = await Artist.findById(info.artistID);
    if (artist) {
      if (!Array.isArray(artist.songs)) {
        artist.songs = [];
      }
      artist.songs.push(song._id);
      await artist.save();
    } else {
      throw new AppError("Artist not found", 404);
    }

    const album = await Album.findById(info.albumID);
    if (album) {
      if (!Array.isArray(album.songs)) {
        album.songs = [];
      }
      album.songs.push(song._id);
      await album.save();
    } else {
      throw new AppError("Album not found", 404);
    }

    await song.populate([
      {
        path: "albumID",
        model: "Album",
        select: "title releaseDate",
      },
    ]);

    sendResponse(res, 200, true, { song }, null, "Created song successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = createSong;
