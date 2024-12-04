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

router.post("/create", validationMiddleware(commonSchema, "body"), createAlbum);

router.get("/:id", validationMiddleware(commonSchema, "params"), getAlbumById);

router.get(
  "/artist/:artistID",
  validationMiddleware(commonSchema, "params"),
  getAlbumsByArtist
);

router.get("/", getAllAlbum);

router.put("/:id", validationMiddleware(commonSchema, "body"), updateAlbum);

router.delete(
  "/:id",
  validationMiddleware(commonSchema, "params"),
  deleteAlbum
);

module.exports = router;
