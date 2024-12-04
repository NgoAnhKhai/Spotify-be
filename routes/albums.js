var express = require("express");
const getAllAlbum = require("../controllers/album/getAllAlbum");
const createAlbum = require("../controllers/album/createAlbum");
const getAlbumById = require("../controllers/album/getAlbumById");
const getAlbumsByArtist = require("../controllers/album/getAlbumByArtistId");
const deleteAlbum = require("../controllers/album/deleteAlbum");
const updateAlbum = require("../controllers/album/updateAlbum");
const validationMiddleware = require("../middlewares/validation.middleware");
const albumValidator = require("../middlewares/albumvalidator/albumValidator");
const authenticateUser = require("../middlewares/authenticateUser");
var router = express.Router();

/*
 *@route POST /album/create
 *@description create Album
 *@access login required
 */
router.post(
  "/create",
  validationMiddleware(albumValidator, "body"),
  authenticateUser,
  createAlbum
);

/*
 *@route GET /album/:id
 *@description get album by id album
 *@access login required
 */
router.get("/:id", authenticateUser, getAlbumById);

/*
 *@route GET /album/artist/:artistID
 *@description get Album by artistID
 *@access login required
 */
router.get("/artist/:artistID", authenticateUser, getAlbumsByArtist);

/*
 *@route GET /album/
 *@description get all Album
 *@access login required
 */
router.get("/", authenticateUser, getAllAlbum);

/*
 *@route PUT /album/:id
 *@description update Album by id
 *@access login required
 */
router.put("/:id", authenticateUser, updateAlbum);

/*
 *@route DELETE /album/:id
 *@description delete album by id album
 *@access login required
 */
router.delete("/:id", authenticateUser, deleteAlbum);

module.exports = router;
