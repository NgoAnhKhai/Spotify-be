const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Genre
const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Hip Hop", "Rap", "Ballad", "US UK", "Rock"],
    },
    description: { type: String },
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
