var express = require("express");
var router = express.Router();

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});
const users = require("./users");
router.use("/user", users);

const songs = require("./songs");
router.use("/song", songs);

const playlists = require("./playlists");
router.use("/playlist", playlists);

const invoices = require("./invoices");
router.use("/invoice", invoices);

const genres = require("./genres");
router.use("/genre", genres);

const artists = require("./artists");
router.use("/artist", artists);

const albums = require("./albums");
router.use("/album", albums);

module.exports = router;
