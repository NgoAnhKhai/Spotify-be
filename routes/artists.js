var express = require("express");
const getAllArtist = require("../controllers/artist/GetAllArtist");
const createArtist = require("../controllers/artist/createArtist");
const deleteArtist = require("../controllers/artist/deleteArtist");
const getArtistById = require("../controllers/artist/getArtistById");
const updateArtist = require("../controllers/artist/updateArtist");
var router = express.Router();

//get All Artist
router.get("/", getAllArtist);

//Create Artist
router.post("/create", createArtist);

// //get Artist by ID
router.get("/:id", getArtistById);

router.put("/:id", updateArtist);

router.delete("/delete/:id", deleteArtist);
module.exports = router;
