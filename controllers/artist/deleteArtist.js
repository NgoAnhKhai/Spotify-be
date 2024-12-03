const { sendResponse, AppError } = require("../../helpers/utils");
const Artist = require("../../models/artist");

const deleteArtist = async (req, res, next) => {
  const artistId = req.params.id;

  if (!artistId) {
    throw new AppError(400, "Artist ID is required");
  }

  try {
    const artist = await Artist.findByIdAndDelete(artistId);

    if (!artist) {
      throw new AppError(404, "Artist not found");
    }

    sendResponse(
      res,
      200,
      true,
      { artist },
      null,
      "Artist deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = deleteArtist;
