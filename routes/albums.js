var express = require("express");
const getAllAlbum = require("../controllers/album/getAllAlbum");
var router = express.Router();

router.get("/", getAllAlbum);

module.exports = router;
