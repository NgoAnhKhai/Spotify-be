var express = require("express");
const getAllUser = require("../controllers/user/getAllUser");
const registerUser = require("../controllers/user/registerUser");
const loginUser = require("../controllers/user/LoginUser");

const updateUser = require("../controllers/user/updateUser");
const getUserProfile = require("../controllers/user/getUserProfile");
const changePassword = require("../controllers/user/changePassword");
const logoutUser = require("../controllers/user/logoutUser");

const getUserPlaylist = require("../controllers/user/getUserPlaylist");
const updateSubscription = require("../controllers/user/updateSubscription");
const authenticateUser = require("../middlewares/authenticateUser");
const commonSchema = require("../middlewares/commonValidator");
const validationMiddleware = require("../middlewares/validation.middleware");
var router = express.Router();

//Register
router.post(
  "/register",
  validationMiddleware(commonSchema, "body"),
  registerUser
);

//Login
router.post("/login", validationMiddleware(commonSchema, "body"), loginUser);

//Get All User (Admin Feture)
router.get("/", getAllUser);

//get User Profile
router.get("/profile", authenticateUser, getUserProfile);

//changePassword
router.put(
  "/changePassword",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  changePassword
);

//Update user
router.put(
  "/profile",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  updateUser
);

//updateSubscription
router.put(
  "/updateSubscription",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  updateSubscription
);

//User Playlist
router.get(
  "/playlists",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getUserPlaylist
);

//Logout user
router.post("/logout", logoutUser);

module.exports = router;
