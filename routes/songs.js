var express = require("express");
const getAllSong = require("../controllers/song/getAllSong");
const getSongById = require("../controllers/song/getSongById");
const searchSongs = require("../controllers/song/searchSong");
const authenticate = require("../middlewares/authenticate");
var router = express.Router();

/*
 *@route GET /songs
 *@description Get all song
 *@access public
 */
router.get("/", getAllSong);

/*
 *@route GET /songs/search?title=...
 *@description search song by name
 *@access public
 */
router.get("/search", searchSongs);

/*
 *@route GET /songs/:id
 *@description get song by id song
 *@access login required
 */
router.get("/:id", authenticate(["user", "admin"]), getSongById);

module.exports = router;
