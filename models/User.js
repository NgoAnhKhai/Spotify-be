const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    subscriptionType: {
      type: String,
      enum: ["Free", "Premium"],
      default: "Free",
    },
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    subscriptionExpireDate: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
