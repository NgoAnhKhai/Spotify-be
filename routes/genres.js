var express = require("express");
const getALlGenre = require("../controllers/genre/getAllGenre");
const createGenre = require("../controllers/genre/createGenre");
const getGenreById = require("../controllers/genre/getGenreById");
const updateGenre = require("../controllers/genre/updateGenre");
const deleteGenre = require("../controllers/genre/deleteGenre");
const authenticateUser = require("../middlewares/authenticateUser");
var router = express.Router();

/*
 *@route GET /genre/
 *@description get all genre
 *@access login required
 */
router.get("/", authenticateUser, getALlGenre);

/*
 *@route POST /genre/create
 *@description create genre
 *@access login required
 */
router.post("/create", authenticateUser, createGenre);

/*
 *@route GET /genre/:id
 *@description get genre by idGenre
 *@access login required
 */
router.get("/:id", authenticateUser, getGenreById);

/*
 *@route PUT /genre/:id
 *@description update genre by id
 *@access login required
 */
router.put("/:id", authenticateUser, updateGenre);

/*
 *@route DELETE /genre/:id
 *@description delete genre
 *@access login required
 */
router.delete("/delete/:id", authenticateUser, deleteGenre);
module.exports = router;
