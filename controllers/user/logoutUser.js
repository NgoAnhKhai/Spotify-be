const { sendResponse } = require("../../helpers/utils");

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
    sendResponse(res, 200, true, null, null, "User logged out successfully!");
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;