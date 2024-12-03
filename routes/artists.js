var express = require("express");
const getAllArtist = require("../controllers/artist/GetAllArtist");
const createArtist = require("../controllers/artist/createArtist");
const deleteArtist = require("../controllers/artist/deleteArtist");
const getArtistById = require("../controllers/artist/getArtistById");
const updateArtist = require("../controllers/artist/updateArtist");
const authenticateUser = require("../middlewares/authenticateUser");
const validationMiddleware = require("../middlewares/validation.middleware");
const commonSchema = require("../middlewares/commonValidator");
var router = express.Router();

//get All Artist
router.get("/", getAllArtist);

//Create Artist
router.post(
  "/create",
  validationMiddleware(commonSchema, "body"),
  authenticateUser,
  createArtist
);

// //get Artist by ID
router.get(
  "/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getArtistById
);

router.put(
  "/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  updateArtist
);

router.delete(
  "/delete/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  deleteArtist
);
module.exports = router;
