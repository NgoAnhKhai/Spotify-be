var express = require("express");
const getAllArtist = require("../controllers/artist/getAllArtist");
const createArtist = require("../controllers/artist/createArtist");
const deleteArtist = require("../controllers/artist/deleteArtist");
const getArtistById = require("../controllers/artist/getArtistById");
const updateArtist = require("../controllers/artist/updateArtist");
const validationMiddleware = require("../middlewares/validation.middleware");
const artistValidator = require("../middlewares/artistValidator.js/createArtistValidator");
const authenticateUser = require("../middlewares/authenticateUser");
var router = express.Router();

/*
 *@route GET /artist/
 *@description get all artist
 *@access login required
 */
router.get("/", authenticateUser, getAllArtist);

/*
 *@route POST /artist/create
 *@description create artist
 *@access login required
 */
router.post(
  "/create",
  validationMiddleware(artistValidator, "body"),
  authenticateUser,
  createArtist
);

/*
 *@route GET /artist/:id
 *@description get Artist By ID
 *@access login required
 */
router.get("/:id", authenticateUser, getArtistById);

/*
 *@route PUT /artist/:id
 *@description update Information Of Artist
 *@access login required
 */
router.put("/:id", authenticateUser, updateArtist);

/*
 *@route GET /artist/
 *@description get all artist
 *@access private
 */
router.delete("/delete/:id", deleteArtist);
module.exports = router;
