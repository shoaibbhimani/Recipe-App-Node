const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Please enter a Recipe name!"
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email Address"],
      required: "Please enter a Recipe name!"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
