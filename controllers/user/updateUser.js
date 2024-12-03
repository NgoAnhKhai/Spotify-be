const User = require("../../models/user");
const { sendResponse, AppError } = require("../../helpers/utils");

const updateUser = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    // Lấy thông tin người dùng từ token
    const user = await User.findById(req.user.userId); // req.user.userId được lấy từ middleware authenticate

    if (!user) {
      throw new AppError(404, "User not found", "NotFound");
    }

    // Cập nhật thông tin người dùng
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    sendResponse(res, 200, true, { user }, null, "User updated successfully!");
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
