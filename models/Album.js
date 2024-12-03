const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Album
const albumSchema = new Schema(
  {
    title: { type: String, required: true },
    releaseDate: { type: Date },
    artistID: { type: Schema.Types.ObjectId, ref: "Artist" },
    coverImageURL: { type: String },
    listSong: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
