const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    genres: [{ type: String }],
    followersCount: { type: Number, default: 0 },
    imageURL: { type: String },
    description: {
      startYear: { type: Number, required: true },
      difficulties: { type: String },
    },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },

  { timestamps: true }
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
