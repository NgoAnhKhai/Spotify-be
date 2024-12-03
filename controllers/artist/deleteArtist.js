const { sendResponse, AppError } = require("../../helpers/utils");
const Artist = require("../../models/artist");

const deleteArtist = async (req, res, next) => {
  const artistId = req.params.id; // Lấy artistId từ params

  // Kiểm tra nếu không có artistId
  if (!artistId) {
    throw new AppError(400, "Artist ID is required");
  }

  try {
    // Tìm và xóa artist trong cơ sở dữ liệu theo ID
    const artist = await Artist.findByIdAndDelete(artistId);

    // Nếu không tìm thấy artist, ném lỗi 404
    if (!artist) {
      throw new AppError(404, "Artist not found");
    }

    // Trả về phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { artist },
      null,
      "Artist deleted successfully"
    );
  } catch (error) {
    // Gọi middleware xử lý lỗi
    next(error);
  }
};

module.exports = deleteArtist;
