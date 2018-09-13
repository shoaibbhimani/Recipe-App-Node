const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email Address"],
      required: "Please enter a valid Email",
      index: true
    },
    hash: String,
    bio: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
