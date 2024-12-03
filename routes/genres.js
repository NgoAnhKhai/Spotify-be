var express = require("express");
const getALlGenre = require("../controllers/genre/getAllGenre");
const createGenre = require("../controllers/genre/createGenre");
const getGenreById = require("../controllers/genre/getGenreById");
const updateGenre = require("../controllers/genre/updateGenre");
const deleteGenre = require("../controllers/genre/deleteGenre");
var router = express.Router();

//All Genre
router.get("/", getALlGenre);

//Create Genre
router.post("/create", createGenre);

//get Genre By Id
router.get("/:id", getGenreById);

//update Genre
router.put("/:id", updateGenre);

//Delete Genre
router.delete(
  "/delete/:id",

  deleteGenre
);
module.exports = router;
