const { sendResponse } = require("../../helpers/utils");
const Genre = require("../../models/genre");

const getALlGenre = async (req, res, next) => {
  const genre = await Genre.find();
  if (!genre || genre.length === 0) {
    return sendResponse(res, 404, false, null, null, "No found");
  }
  sendResponse(
    res,
    200,
    true,
    { genres: genre },
    null,
    "Invoices retrieved successfully"
  );
};
module.exports = getALlGenre;
