const User = require("../../../models/user"); // Đảm bảo đường dẫn chính xác đến model User

// Hàm lấy thông tin của tất cả Admin
const getAdminInfo = async (req, res, next) => {
  try {
    // Tìm tất cả người dùng có role là "admin"
    const admins = await User.find({ role: "admin" }).select(
      "username email role -_id"
    );

    // Nếu không có admin nào
    if (!admins || admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admin found",
      });
    }

    // Trả về thông tin của các admin
    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    // Xử lý lỗi
    next(error);
  }
};

module.exports = getAdminInfo;
