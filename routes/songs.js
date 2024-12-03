var express = require("express");
const getAllSong = require("../controllers/song/getAllSong");
const createSong = require("../controllers/song/createSong");
const updateSong = require("../controllers/song/updateSong");
const getSongById = require("../controllers/song/getSongById");
const searchSongs = require("../controllers/song/searchSong");
const deleteSong = require("../controllers/song/deleteSong");
var router = express.Router();

router.get("/", getAllSong);

router.post("/create", createSong);

router.put("/update/:id", updateSong);

router.get("/:id", getSongById);

router.get("/search", searchSongs);

router.delete("/delete/:id", deleteSong);

module.exports = router;
