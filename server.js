const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
    console.log(recipes);
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
  .post("/recipe/add", upload.single("photo"), async (req, res) => {
    // check if there is no new file to resize
    if (!req.file) {
      return;
    }

    const extension = req.file.mimetype.split("/")[1];
    const imageName = req.file.originalname.split(".")[0];
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(400, 300);
    await photo.write(`./public/uploads/${imageName}.${extension}`);

    const recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.imageName = imageName;
    recipe.description = req.body.description;
    recipe.instructions = req.body.instructions;
    await recipe.save();

    await res.redirect("/recipe/new");
  });

//Server
const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server is ${PORT}`);
});
