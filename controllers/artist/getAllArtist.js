const { sendResponse } = require("../../helpers/utils");
const Artist = require("../../models/artist");

const getAllArtist = async (req, res, next) => {
  try {
    const artists = await Artist.find().populate("songs");

    if (!artists || artists.length === 0) {
      return sendResponse(res, 404, false, null, null, "No artists found");
    }

    sendResponse(
      res,
      200,
      true,
      { artists },
      null,
      "Artists retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getAllArtist;
