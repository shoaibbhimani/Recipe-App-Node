const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Please enter a Recipe name!"
    },
    description: {
      type: String,
      trim: true,
      required: "Please enter a Recipe Description"
    },
    imageName: {
      type: String,
      trim: true,
    },
    directions: [
      {
        type: String,
        required: "You must supply directions"
      }
    ],
    ingredients: [
      {
        type: String,
        required: "You must supply ingredients"
      }
    ],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: "You must supply an Created"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
