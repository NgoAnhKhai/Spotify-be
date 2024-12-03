var express = require("express");
const getAllPlaylist = require("../controllers/playlist/getAllPlaylist");
var router = express.Router();

router.get("/", getAllPlaylist);

module.exports = router;
