const { sendResponse } = require("../../helpers/utils");
const Album = require("../../models/Album");

const getAllAlbum = async (req, res, next) => {
  const album = await Album.find();
  if (!album || album.length === 0) {
    return sendResponse(res, 404, false, null, null, "No found");
  }
  sendResponse(
    res,
    200,
    true,
    { albums: album },
    null,
    "Invoices retrieved successfully"
  );
};
module.exports = getAllAlbum;
