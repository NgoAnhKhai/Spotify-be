const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { sendResponse, AppError } = require("../../helpers/utils");

const registerUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      throw new AppError(400, "Email already in use", "BadRequest");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

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
