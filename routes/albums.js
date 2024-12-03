var express = require("express");
const getAllAlbum = require("../controllers/album/getAllAlbum");
const createAlbum = require("../controllers/album/createAlbum");
const getAlbumById = require("../controllers/album/getAlbumById");
const getAlbumsByArtist = require("../controllers/album/getAlbumByArtistId");
const deleteAlbum = require("../controllers/album/deleteAlbum");
const updateAlbum = require("../controllers/album/updateAlbum");
const authenticateUser = require("../middlewares/authenticateUser");
const validationMiddleware = require("../middlewares/validation.middleware");
const commonSchema = require("../middlewares/commonValidator");
var router = express.Router();

router.post(
  "/create",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  createAlbum
);

router.get(
  "/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getAlbumById
);

router.get(
  "/artist/:artistID",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getAlbumsByArtist
);

router.get("/", authenticateUser, getAllAlbum);

router.put(
  "/",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  updateAlbum
);

router.delete(
  "/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  deleteAlbum
);

module.exports = router;
