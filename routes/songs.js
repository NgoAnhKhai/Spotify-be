var express = require("express");
const getAllSong = require("../controllers/song/getAllSong");
const createSong = require("../controllers/song/createSong");
const updateSong = require("../controllers/song/updateSong");
const getSongById = require("../controllers/song/getSongById");
const searchSongs = require("../controllers/song/searchSong");
const deleteSong = require("../controllers/song/deleteSong");
const validationMiddleware = require("../middlewares/validation.middleware");
const addSongToAlbum = require("../controllers/song/addSongToAlbum");
const createSongValidator = require("../middlewares/songValidator.js/songCreateValidator");
const authenticateUser = require("../middlewares/authenticateUser");
var router = express.Router();

/*
 *@route POST /song/create
 *@description create song
 *@access login required
 */
router.post(
  "/create",
  validationMiddleware(createSongValidator, "body"),
  authenticateUser,
  createSong
);

/*
 *@route GET /song/
 *@description Get all song
 *@access login required
 */
router.get("/", authenticateUser, getAllSong);

/*
 *@route PUT /song/update/:id
 *@description update Song
 *@access login required
 */
router.put("/update/:id", authenticateUser, updateSong);

/*
 *@route PUT /song/:id
 *@description add song to album
 *@access login required
 */
router.put("/:id", authenticateUser, addSongToAlbum);

/*
 *@route GET /song/search
 *@description search song by name
 *@access login required
 */
router.get("/search", authenticateUser, searchSongs);

/*
 *@route GET /song/:id
 *@description get song by id song
 *@access login required
 */
router.get("/:id", authenticateUser, getSongById);

/*
 *@route DELETE /song/delete/:id
 *@description delete song
 *@access login required
 */
router.delete("/delete/:id", authenticateUser, deleteSong);

module.exports = router;
