var express = require("express");
const getUserProfile = require("../controllers/user/usersManagement/getUserProfile");
const changePassword = require("../controllers/user/usersManagement/changePassword");
const updateSubscription = require("../controllers/user/usersManagement/updateSubscription");
const getUserPlaylist = require("../controllers/user/usersManagement/getUserPlaylist");
const updateUser = require("../controllers/user/usersManagement/updateUser");
const cancelSubscription = require("../controllers/user/usersManagement/cancelSubscription");
const authenticate = require("../middlewares/authenticate");
const validationMiddleware = require("../middlewares/validation.middleware");
const userChangePassSchema = require("../controllers/src/userSchemaValidator/userChangePassSchema");
var router = express.Router();

/*
 *@route GET /users/:id/profile
 *@description Get The Profile Of user
 *@access Login Required
 */
router.get("/:id/profile", authenticate(["user", "admin"]), getUserProfile);

/*
 *@route PUT /users/:id/profile
 *@description update profile user
 *@access Login Required
 */
router.put("/:id/profile", authenticate(["user", "admin"]), updateUser);
/*
 *@route PUT /users/:id/profile/password
 *@description Change Password
 *@access Login Required
 */
router.put(
  "/:id/profile/changePassword",
  validationMiddleware(userChangePassSchema, "body"),
  authenticate(["user", "admin"]),
  changePassword
);

/*
 *@route PUT /users/:id/buy
 *@description Buy Subscription
 *@access Login Required
 */
router.put("/:id/buy", authenticate(["user", "admin"]), updateSubscription);

/*
 *@route PUT /users/:id/cancel
 *@description cancel Subscription
 *@access Login Required
 */
router.put("/:id/cancel", authenticate(["user", "admin"]), cancelSubscription);

/*
 *@route GET /users/playlists
 *@description Get The playlist of user
 *@access Login Required
 */
router.get("/:id/playlists", authenticate(["user", "admin"]), getUserPlaylist);

module.exports = router;
