const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Song
const songSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    popularity: { type: Number, default: 0 },
    artistID: { type: Schema.Types.ObjectId, ref: "Artist" },
    albumID: { type: Schema.Types.ObjectId, ref: "Album" },
    genreID: [{ type: Schema.Types.ObjectId, ref: "Genre" }],

    URL: { type: String, required: true },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
