const { sendResponse, AppError } = require("./helpers/utils");
require("dotenv").config();
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var songsRouter = require("./routes/songs");
var playlistsRouter = require("./routes/playlists");
var invoicesRouter = require("./routes/invoices");
var genresRouter = require("./routes/genres");
var artistRouter = require("./routes/artists");
var albumsRouter = require("./routes/albums");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log(`connected to ${mongoURI}`))
  .catch((err) => console.log(err));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/songs", songsRouter);
app.use("/playlists", playlistsRouter);
app.use("/invoices", invoicesRouter);
app.use("/genres", genresRouter);
app.use("/artists", artistRouter);
app.use("/albums", albumsRouter);

app.use((req, res, next) => {
  const err = new AppError(404, "Not Found");
  next(err);
});

app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperational ? err.errorType : "Internal Server Error"
  );
});
module.exports = app;
