const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { sendResponse, AppError } = require("../../helpers/utils");

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Lấy thông tin người dùng từ token
    const user = await User.findById(req.user.userId);

    if (!user) {
      throw new AppError(404, "User not found", "NotFound");
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect old password" });
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Cập nhật mật khẩu mới
    user.passwordHash = newPasswordHash;

    await user.save();

    sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Password updated successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = changePassword;