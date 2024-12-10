const User = require("../../../models/user");
const { sendResponse, AppError } = require("../../../helpers/utils");

const getUserProfile = async (req, res, next) => {
  try {
    console.log("req.user:", req.user.userId);
    const user = await User.findById(req.user.userId);
    console.log("Tìm thấy user:", user);

    if (!user) {
      throw new AppError(404, "User not found", "NotFound");
    }
    sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "User profile fetched successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getUserProfile;
