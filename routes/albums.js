var express = require("express");
const getAllAlbum = require("../controllers/album/getAllAlbum");
const getAlbumById = require("../controllers/album/getAlbumById");
const getAlbumsByArtist = require("../controllers/album/getAlbumByArtistId");
const authenticate = require("../middlewares/authenticate");

var router = express.Router();

/*
 *@route GET /albums/:id
 *@description get album by id album
 *@access login required
 */
router.get("/:id", getAlbumById);

/*
 *@route GET /albums/artist/:artistID
 *@description get Album by artistID
 *@access login required
 */
router.get(
  "/artists/:artistID",
  authenticate(["user", "admin"]),
  getAlbumsByArtist
);

/*
 *@route GET /albums/
 *@description get all Album
 *@access public
 */
router.get("/", getAllAlbum);

module.exports = router;
