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
    premiumExpiryDate: { type: Date },
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    dateJoined: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
