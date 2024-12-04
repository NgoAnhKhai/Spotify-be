var express = require("express");
const getAllPlaylist = require("../controllers/playlist/getAllPlaylist");
const createPlaylist = require("../controllers/playlist/createPlaylist");
const addSongToPlaylist = require("../controllers/playlist/addSongToPlaylist");
const deletePlaylist = require("../controllers/playlist/deleteSong");
const removeSong = require("../controllers/playlist/removeSongToPlaylist");
const getPlaylistById = require("../controllers/playlist/getPlaylistById");
const getPlaylistByUserid = require("../controllers/playlist/getPlaylistByUser");
const authenticateUser = require("../middlewares/authenticateUser");

const validationMiddleware = require("../middlewares/validation.middleware");
const createPlaylistValidator = require("../middlewares/playlistValidator.js/createPlaylistValidator");
var router = express.Router();

/*
 *@route POST /playlist/create
 *@description create playlist of user
 *@access login required
 */
router.post(
  "/create",
  validationMiddleware(createPlaylistValidator, "body"),
  authenticateUser,
  createPlaylist
);

/*
 *@route POST /playlist/:id/add
 *@description add song to playlist
 *@access login required
 */
router.post("/:id/add", authenticateUser, addSongToPlaylist);

/*
 *@route GET /playlist/
 *@description Get all playlist
 *@access login required
 */
router.get("/", authenticateUser, getAllPlaylist);

/*
 *@route GET /playlist/user/:userID
 *@description get playlist by userID
 *@access login required
 */
router.get("/user/:userID", authenticateUser, getPlaylistByUserid);

/*
 *@route GET /playlist/:id
 *@description Get playlist by playlist id
 *@access login required
 */
router.get("/:id", authenticateUser, getPlaylistById);

/*
 *@route delete /playlist/remove/:id
 *@description remove song from playlist
 *@access login required
 */
router.delete("/remove/:id", authenticateUser, removeSong);

/*
 *@route DELETE /playlist/:id
 *@description delete playlist of user
 *@access login required
 */
router.delete("/delete/:id", authenticateUser, deletePlaylist);

module.exports = router;
