var express = require("express");
const getAllArtist = require("../controllers/artist/GetAllArtist");
const createArtist = require("../controllers/artist/createArtist");
const deleteArtist = require("../controllers/artist/deleteArtist");
const getArtistById = require("../controllers/artist/getArtistById");
const updateArtist = require("../controllers/artist/updateArtist");
const validationMiddleware = require("../middlewares/validation.middleware");
const commonSchema = require("../middlewares/commonValidator");
var router = express.Router();

router.get("/", getAllArtist);

router.post(
  "/create",
  validationMiddleware(commonSchema, "body"),
  createArtist
);

router.get("/:id", validationMiddleware(commonSchema, "params"), getArtistById);

router.put("/:id", validationMiddleware(commonSchema, "params"), updateArtist);

router.delete(
  "/delete/:id",
  validationMiddleware(commonSchema, "params"),
  deleteArtist
);
module.exports = router;
