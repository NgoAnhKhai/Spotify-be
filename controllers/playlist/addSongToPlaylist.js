const { sendResponse, AppError } = require("../../helpers/utils");
const Playlist = require("../../models/Playlist");
const Song = require("../../models/song");

const addSongToPlaylist = async (req, res, next) => {
  const { id } = req.params;
  const { songIds } = req.body;

  if (!songIds || songIds.length === 0) {
    throw new AppError("Please provide songId(s)", 400);
  }

  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      throw new AppError("Playlist not found", 404);
    }

    const songsToAdd = Array.isArray(songIds) ? songIds : [songIds];

    for (const songId of songsToAdd) {
      const songExists = await Song.findById(songId);
      if (!songExists) {
        throw new AppError(`Song with id ${songId} not found`, 404);
      }

      if (playlist.songs.includes(songId)) {
        throw new AppError(
          `Song with id ${songId} already exists in the playlist`,
          400
        );
      }
    }

    playlist.songs.push(...songsToAdd);

    await playlist.save();

    sendResponse(
      res,
      200,
      true,
      { playlist },
      null,
      "Song(s) added to playlist successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = addSongToPlaylist;
