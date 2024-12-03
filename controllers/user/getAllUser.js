const { sendResponse, AppError } = require("../../helpers/utils");
const User = require("../../models/user");

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return sendResponse(res, 404, false, null, null, "No users found");
    }
    sendResponse(res, 200, true, { users: users }, null, "Successfully");
    console.log("Users data", users);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllUser;
