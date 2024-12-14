const { AppError, sendResponse } = require("../../helpers/utils");
const Artist = require("../../models/artist");

const findArtistByName = async (name) => {
  try {
    const artists = await Artist.find({
      name: { $regex: name, $options: "i" },
    });

    if (artists.length === 0) {
      throw new AppError("No artists found with that name", 404);
    }

    sendResponse(res, 200, true, { artists }, null, "successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = findArtistByName;
