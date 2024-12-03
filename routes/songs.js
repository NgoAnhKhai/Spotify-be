var express = require("express");
const getAllSong = require("../controllers/song/getAllSong");
const createSong = require("../controllers/song/createSong");
const updateSong = require("../controllers/song/updateSong");
const getSongById = require("../controllers/song/getSongById");
const searchSongs = require("../controllers/song/searchSong");
const deleteSong = require("../controllers/song/deleteSong");
const validationMiddleware = require("../middlewares/validation.middleware");
const commonSchema = require("../middlewares/commonValidator");
var router = express.Router();

router.post("/create", validationMiddleware(commonSchema, "body"), createSong);

router.get("/", getAllSong);

router.put(
  "/update/:id",
  validationMiddleware(commonSchema, "params"),
  updateSong
);

router.get("/search", searchSongs);

router.get("/:id", validationMiddleware(commonSchema, "params"), getSongById);

router.delete(
  "/delete/:id",
  validationMiddleware(commonSchema, "params"),
  deleteSong
);

module.exports = router;
