var express = require("express");
const getAllUser = require("../controllers/user/getAllUser");
const registerUser = require("../controllers/user/registerUser");
const loginUser = require("../controllers/user/LoginUser");

const updateUser = require("../controllers/user/updateUser");
const getUserProfile = require("../controllers/user/getUserProfile");
const changePassword = require("../controllers/user/changePassword");
const logoutUser = require("../controllers/user/logoutUser");

const getUserPlaylist = require("../controllers/user/getUserPlaylist");
const authenticateUser = require("../middlewares/authenticateUser");
const commonSchema = require("../middlewares/commonValidator");
const validationMiddleware = require("../middlewares/validation.middleware");
const updateSubscription = require("../controllers/user/buyPremium");
var router = express.Router();

/*
 *@route POST /user/register
 *@description register
 *@access public
 */
router.post(
  "/register",
  validationMiddleware(commonSchema, "body"),
  registerUser
);

/*
 *@route POST /user/login
 *@description Login
 *@access register required
 */
router.post("/login", validationMiddleware(commonSchema, "body"), loginUser);

/*
 *@route GET /user/
 *@description Get All User(For Admin)
 *@access private
 */
router.get("/", getAllUser);

/*
 *@route GET /user/profile
 *@description Get The Profile Of user
 *@access Login Required
 */
router.get("/profile", authenticateUser, getUserProfile);

/*
 *@route PUT /user/password
 *@description Chang Password
 *@access Login Required
 */
router.put(
  "/Password",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  changePassword
);

/*
 *@route PUT /user/profile
 *@description update profile user
 *@access Login Required
 */
router.put(
  "/profile",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  updateUser
);

/*
 *@route PUT /user/updateSubscription
 *@description Buy Subscription
 *@access Login Required
 */
router.put(
  "/subscription",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  updateSubscription
);

/*
 *@route GET /user/playlists
 *@description Get The playlist of user
 *@access Login Required
 */
router.get(
  "/playlists",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getUserPlaylist
);

/*
 *@route POST /user/logout
 *@description Logout User
 *@access login Required
 */
router.post("/logout", authenticateUser, logoutUser);

module.exports = router;
