const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { sendResponse, AppError } = require("../../helpers/utils");

const registerUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError(400, "Email already in use", "BadRequest");
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    const newUser = new User({
      email,
      username,
      passwordHash,
    });

    await newUser.save();

    sendResponse(
      res,
      201,
      true,
      { user: newUser },
      null,
      "User registered successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
