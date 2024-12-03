const { sendResponse, AppError } = require("../../helpers/utils");
const Artist = require("../../models/artist");

const createArtist = async (req, res, next) => {
  const info = req.body;
  if (!info) {
    throw new AppError(404, "not provided");
  }
  try {
    const existingArtist = await Artist.findOne({ name: info.name });
    if (existingArtist) {
      throw new AppError(400, "Artist already exists");
    }

    const artist = await Artist.create(info);
    if (info.songs && info.songs.length > 0) {
      for (let songId of info.songs) {
        await Song.findByIdAndUpdate(songId, { artistID: artist._id });
      }
    }

    sendResponse(
      res,
      200,
      true,
      { artist },
      null,
      "created artist successfully"
    );
  } catch (error) {
    next(error);
  }
};
module.exports = createArtist;
