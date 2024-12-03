const { sendResponse } = require("../../helpers/utils");
const Artist = require("../../models/artist");

const getAllArtist = async (req, res, next) => {
  const artist = await Artist.find();
  if (!artist || artist.length === 0) {
    return sendResponse(res, 404, false, null, null, "No found");
  }
  sendResponse(
    res,
    200,
    true,
    { artists: artist },
    null,
    "Invoices retrieved successfully"
  );
};
module.exports = getAllArtist;
