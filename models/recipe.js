const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Please enter a Recipe name!"
    },
    imageName: {
      type: String,
      trim: true,
      required: "Please enter a Image Name"
    },
    description: {
      type: String,
      trim: true,
      required: "Please enter a Recipe Description"
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
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("recipe", recipeSchema);
