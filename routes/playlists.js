var express = require("express");
const getAllPlaylist = require("../controllers/playlist/getAllPlaylist");
const createPlaylist = require("../controllers/playlist/createPlaylist");
const addSongToPlaylist = require("../controllers/playlist/addSongToPlaylist");
const deletePlaylist = require("../controllers/playlist/deleteSong");
const removeSong = require("../controllers/playlist/removeSongToPlaylist");
const getPlaylistById = require("../controllers/playlist/getPlaylistById");
const getPlaylistByUserid = require("../controllers/playlist/getPlaylistByUser");
const authenticateUser = require("../middlewares/authenticateUser");
const commonSchema = require("../middlewares/commonValidator");
const validationMiddleware = require("../middlewares/validation.middleware");
var router = express.Router();

router.post(
  "/create",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  createPlaylist
);

router.post(
  "/:id/add",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  addSongToPlaylist
);

router.get("/", getAllPlaylist);

router.get(
  "/user/:userID",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getPlaylistByUserid
);

router.get(
  "/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getPlaylistById
);

router.delete(
  "/remove/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  removeSong
);

router.delete(
  "/delete/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  deletePlaylist
);

module.exports = router;
