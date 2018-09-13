const router = require("express").Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const Recipe = mongoose.model("Recipe");

const upload = require("../handler/multer");
const validation = require("../handler/validation");

router
  .get(["/", "/recipes"], async (req, res) => {
    const recipes = await Recipe.find({});
    res.render("recipes", {
      title: "Recipes List",
      recipes
    });
  })
  .get("/my_recipes", validation.isAuthenticated, async (req, res) => {
    const recipes = await Recipe.find({ createdBy: req.user.id });
    res.render("recipes", {
      title: "My Recipes List",
      recipes
    });
  })
  .get("/recipe/new", validation.isAuthenticated, async (req, res) => {
    res.render("form", {
      title: "Add New Recipe",
      isEdit: false
    });
  })
  .get("/recipe/edit/:recipeId", async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.recipeId });
    res.render("form", {
      title: "Edit Recipe",
      body: recipe,
      isEdit: true
    });
  })
  .post(
    "/recipe/:recipeId",
    // validation.validateRegisterRecipe,
    // validation.sendErrorsAfterValidation,
    async (req, res) => {
      await Recipe.findOneAndUpdate(
        { _id: req.params.recipeId },
        {
          $set: req.body
        },
        {
          new: true,
          runValidators: true
        }
      );

      res.redirect(`/recipe/${req.params.recipeId}`);
    }
  )
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
    // validation.validateRegisterRecipe,
    // validation.sendErrorsAfterValidation,
    async (req, res) => {
      let uploadResult = "";
      if (req.file) {
        uploadResult = await cloudinary.uploader.upload(req.file.path);
      }

      const recipe = new Recipe();
      recipe.name = req.body.name;
      recipe.imageName = uploadResult
        ? uploadResult.secure_url
        : "/uploads/default.jpeg";
      recipe.description = req.body.description;
      recipe.directions = req.body.directions;
      recipe.createdBy = req.user.id;
      await recipe.save();

      await res.redirect("/recipe/new");
    }
  );

module.exports = router;
