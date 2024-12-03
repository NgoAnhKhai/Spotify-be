const Invoice = require("../../models/Invoice");
const { sendResponse, AppError } = require("../../helpers/utils");

// Hàm lấy tất cả hóa đơn của người dùng
const getUserInvoices = async (req, res, next) => {
  try {
    const userId = req.user.userId; // Dùng userId từ token sau khi authenticate

    // Lấy tất cả hóa đơn của người dùng
    const invoices = await Invoice.find({ userID: userId }).populate("userID");

    if (!invoices || invoices.length === 0) {
      throw new AppError(404, "No invoices found for this user", "NotFound");
    }

    // Trả về danh sách hóa đơn của người dùng
    sendResponse(
      res,
      200,
      true,
      { invoices },
      null,
      "User invoices fetched successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getUserInvoices;
