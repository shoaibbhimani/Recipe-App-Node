const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");

// Multer Configuration
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.indexOf("image/") === -1) {
      // To reject this file pass `false`, like so:
      cb(null, false);
    }

    // To accept the file pass `true`, like so:
    cb(null, true);
  }
});

//Models
require("./models/mongoose");
require("./models/recipe");

//Mongoose
const Recipe = mongoose.model("recipe");

//Set Templating Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes
app
  .get("/", async (req, res) => {
    const recipes = await Recipe.find({});
    res.render("recipes", {
      title: "Recipes List",
      recipes
    });
  })
  .get("/recipe/new", (req, res) => {
    res.render("form", {
      title: "Add New Recipe"
    });
  })
  .get("/recipe/:recipeId", async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.recipeId });
    res.render("recipe_details", {
      title: "Recipes Details",
      recipe
    });
  })
  .post(
    "/recipe/add",
    upload.single("photo"),
    [
      check("name")
        .isLength({ min: 3 })
        .withMessage("must be at least 3 chars long"),
      check("description")
        .isLength({ min: 5 })
        .withMessage("must be at least 5 chars long"),
      check("directions")
        .isLength({ min: 1 })
        .withMessage("must be at least 1 direction")
    ],
    async (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let arr = errors.array().reduce((acc, currentValue) => {
             acc[currentValue.param] = currentValue.msg
            return acc;
        }, {})
        return res.redirect("/recipe/new")
      }

      // check if there is no new file to resize
      if (!req.file) {
        return;
      }


      const recipe = new Recipe();
      recipe.name = req.body.name;
      recipe.imageName = imageName;
      recipe.description = req.body.description;
      recipe.directions = req.body.directions;
      await recipe.save();

      await res.redirect("/recipe/new");
    }
  );

//Server
const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server is ${PORT}`);
});
