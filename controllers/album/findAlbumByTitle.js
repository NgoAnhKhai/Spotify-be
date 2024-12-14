const { AppError, sendResponse } = require("../../helpers/utils");
const Album = require("../../models/Album");

const findAlbumByTitle = async (title) => {
  try {
    const albums = await Album.find({
      title: { $regex: title, $options: "i" },
    });

    if (albums.length === 0) {
      throw new AppError("No albums found with that title");
    }

    sendResponse(res, 200, true, { albums }, null, "find album successfully");
  } catch (error) {
    throw new Error(error.message || "An error occurred while finding albums");
  }
};

module.exports = findAlbumByTitle;
