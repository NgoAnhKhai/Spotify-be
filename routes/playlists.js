var express = require("express");
const getAllPlaylist = require("../controllers/playlist/getAllPlaylist");
const createPlaylist = require("../controllers/playlist/createPlaylist");
const addSongToPlaylist = require("../controllers/playlist/addSongToPlaylist");
const deletePlaylist = require("../controllers/playlist/deleteSong");
const removeSong = require("../controllers/playlist/removeSongToPlaylist");
const getPlaylistById = require("../controllers/playlist/getPlaylistById");
const getPlaylistByUserid = require("../controllers/playlist/getPlaylistByUser");
const validationMiddleware = require("../middlewares/validation.middleware");
const createPlaylistSchema = require("../controllers/src/playlistSchemaValidator/createPlaylistSchema");
const addSongToPlaylistSchema = require("../controllers/src/playlistSchemaValidator/addSongToPlaylistSchema");
const authenticate = require("../middlewares/authenticate");

var router = express.Router();

/*
 *@route POST /playlists/
 *@description create playlist of user
 *@access login required
 */
router.post(
  "/:id",
  validationMiddleware(createPlaylistSchema, "body"),
  authenticate(["user", "admin"]),
  createPlaylist
);

/*
 *@route POST /playlists/:id/add
 *@description add song to playlist
 *@access login required
 */
router.post(
  "/:id/add",
  validationMiddleware(addSongToPlaylistSchema, "body"),
  authenticate(["user", "admin"]),
  addSongToPlaylist
);

/*
 *@route GET /playlists/
 *@description Get all playlist
 *@access login required
 */
router.get("/", authenticate(["user", "admin"]), getAllPlaylist);

/*
 *@route GET /playlists/user/:userID
 *@description get playlist by userID
 *@access login required
 */
router.get(
  "/users/:userID",
  authenticate(["user", "admin"]),
  getPlaylistByUserid
);

/*
 *@route GET /playlists/:id
 *@description Get playlist by playlist id
 *@access login required
 */
router.get("/:id", authenticate(["user", "admin"]), getPlaylistById);

/*
 *@route delete /playlists/remove/:id
 *@description remove song from playlist
 *@access login required
 */
router.post("/:id/remove", authenticate(["user", "admin"]), removeSong);

/*
 *@route DELETE /playlists/:id
 *@description delete playlist of user
 *@access login required
 */
router.delete("/:id", authenticate(["user", "admin"]), deletePlaylist);

module.exports = router;
