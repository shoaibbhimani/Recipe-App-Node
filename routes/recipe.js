const router = require("express").Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const { check, validationResult } = require("express-validator/check");
const Recipe = mongoose.model("Recipe");

const upload = require("../handler/multer");
const validation = require("../handler/validation");

router
  .get("/", async (req, res) => {
    const recipes = await Recipe.find({});
    res.render("recipes", {
      title: "Recipes List",
      recipes
    });
  })
  .get("/recipe/new", async (req, res) => {
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
    validation.validateRegisterRecipe,
    async (req, res) => {
      let uploadResult = '';
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let arr = errors.array().reduce((acc, currentValue) => {
          acc[currentValue.param] = currentValue.msg;
          return acc;
        }, {});

        return res.render("form", {
          title: "Add New Recipe",
          body: req.body,
          errors: arr
        });
      }

      if(req.file){
        uploadResult  = await cloudinary.uploader.upload(req.file.path);
      }

      const recipe = new Recipe();
      recipe.name = req.body.name;
      recipe.imageName = uploadResult ? uploadResult.secure_url : '/uploads/default.jpeg';
      recipe.description = req.body.description;
      recipe.directions = req.body.directions;
      await recipe.save();

      await res.redirect("/recipe/new");
    }
  );

module.exports = router;
