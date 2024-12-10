var express = require("express");

const getGenreById = require("../controllers/genre/getGenreById");
const getAllGenre = require("../controllers/genre/getAllGenre");
const authenticate = require("../middlewares/authenticate");
var router = express.Router();

/*
 *@route GET /genres/
 *@description get all genre
 *@access login required
 */
router.get("/", authenticate(["user", "admin"]), getAllGenre);

/*
 *@route GET /genres/:id
 *@description get genre by idGenre
 *@access login required
 */
router.get("/:id", authenticate(["user", "admin"]), getGenreById);

module.exports = router;
