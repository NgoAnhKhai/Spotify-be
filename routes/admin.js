var express = require("express");

const getAdminInfo = require("../controllers/user/adminManagement/getAdmin");
const authenticate = require("../middlewares/authenticate");
const assignRole = require("../controllers/user/roleManagement/assignRole");
const getAllUser = require("../controllers/user/adminManagement/getAllUser");
const createSong = require("../controllers/song/createSong");
const updateSong = require("../controllers/song/updateSong");
const deleteSong = require("../controllers/song/deleteSong");
const updateSongSchema = require("../controllers/src/songSchemaValidator/updateSongSchema");
const createSongSchema = require("../controllers/src/songSchemaValidator/createSongSchema");
const validationMiddleware = require("../middlewares/validation.middleware");
const getAllInvoice = require("../controllers/invoice/getAllInvoice");
const getInvoiceById = require("../controllers/invoice/getInvoiceById");
const createGenre = require("../controllers/genre/createGenre");
const updateGenreSchema = require("../controllers/src/genreSchemaValidator/updateGenreSchema");
const createGenreSchema = require("../controllers/src/genreSchemaValidator/createGenreSchema");
const createArtist = require("../controllers/artist/createArtist");
const createArtistSchema = require("../controllers/src/artistSchemaValidator/createArtistSchema");
const updateArtist = require("../controllers/artist/updateArtist");
const updateArtistSchema = require("../controllers/src/artistSchemaValidator/updateArtistSchema");
const deleteArtist = require("../controllers/artist/deleteArtist");
const createAlbum = require("../controllers/album/createAlbum");
const createAlbumShema = require("../controllers/src/albumSchemavalidator/createAlbumShema");
const updateAlbum = require("../controllers/album/updateAlbum");
const updateAlbumSchema = require("../controllers/src/albumSchemavalidator/updateAlbumSchema");
const deleteAlbum = require("../controllers/album/deleteAlbum");
const updateGenre = require("../controllers/genre/updateGenre");
const deleteGenre = require("../controllers/genre/deleteGenre");

var router = express.Router();
router.get("/dashboard", authenticate("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the dashboard",
    user: req.user,
  });
});

/*
 *@route GET admin/users
 *@description Get List All User(For Admin)
 *@access private
 */
router.get("/users", authenticate("admin"), getAllUser);

/*
 *@route POST admin/artists
 *@description create artist
 *@access private
 */
router.post(
  "/artists",
  validationMiddleware(createArtistSchema, "body"),
  authenticate("admin"),
  createArtist
);

/*
 *@route PUT admin/artists/:id
 *@description update Information Of Artist
 *@access private
 */
router.put(
  "/artists/:id",
  validationMiddleware(updateArtistSchema, "body"),
  authenticate("admin"),
  updateArtist
);

/*
 *@route DELETE admin/artists/:id
 *@description DELETE artist
 *@access private
 */
router.delete("/artists/:id", authenticate("admin"), deleteArtist);

/*
 *@route POST /admin/albums
 *@description create Album
 *@access login required
 */
router.post(
  "/albums",
  validationMiddleware(createAlbumShema, "body"),
  authenticate("admin"),
  createAlbum
);

/*
 *@route PUT admin/albums/:id
 *@description update Album by id
 *@access login required
 */
router.put(
  "/albums/:id",
  validationMiddleware(updateAlbumSchema, "body"),
  authenticate("admin"),
  updateAlbum
);

/*
 *@route DELETE album/albums/:id
 *@description delete album by id album
 *@access login required
 */
router.delete("/albums/:id", authenticate("admin"), deleteAlbum);

/*
 *@route POST admin/genres
 *@description create genre
 *@access private
 */
router.post(
  "/genres",
  validationMiddleware(createGenreSchema, "body"),
  authenticate("admin"),
  createGenre
);

/*
 *@route PUT admin/genres/:id
 *@description update genre by id
 *@access private
 */
router.put(
  "/genres/:id",
  validationMiddleware(updateGenreSchema, "body"),
  authenticate("admin"),
  updateGenre
);

/*
 *@route DELETE admin/genres/:id
 *@description delete genre
 *@access private
 */
router.delete("/genres/:id", authenticate("admin"), deleteGenre);

/*
 *@route GET admin/invoices/
 *@description get all invoice
 *@access private
 */
router.get("/invoices", authenticate("admin"), getAllInvoice);

/*
 *@route GET admin/invoices/:id
 *@description get invoice by id invoice
 *@access private
 */
router.get("/invoices/:id", authenticate("admin"), getInvoiceById);

/*
 *@route POST admin/songs
 *@description create song
 *@access private
 */
router.post(
  "/songs",
  validationMiddleware(createSongSchema, "body"),
  authenticate("admin"),
  createSong
);

/*
 *@route PUT admin/songs/:id
 *@description update Song
 *@access private
 */
router.put(
  "/songs/:id",
  validationMiddleware(updateSongSchema, "body"),
  authenticate("admin"),
  updateSong
);

/*
 *@route DELETE admin/songs/delete/:id
 *@description delete song
 *@access private
 */
router.delete("/songs/:id", authenticate("admin"), deleteSong);

/*
 *@route PUT admin/assign-role
 *@description Assign role for user(For Admin)
 *@access private
 */
router.put("/assign-role", authenticate("admin"), assignRole);

/*
 *@route GET admin/info
 *@description Get Infor Of Admin(For Admin)
 *@access private
 */
router.get("/info", authenticate("admin"), getAdminInfo);

module.exports = router;
