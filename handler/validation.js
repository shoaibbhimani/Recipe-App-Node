const { check, validationResult } = require("express-validator/check");

module.exports = {
  validateRegisterRecipe: [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
  ],
  sendErrorsAfterValidation: (req, res, next) => {
    const { recipeId } = req.params;

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    let arr = errors.array().reduce((acc, currentValue) => {
      acc[currentValue.param] = currentValue.msg;
      return acc;
    }, {});

    return res.render("form", {
      title: recipeId ? "Edit Recipe" : "Add New Recipe",
      body: req.body,
      errors: arr
    });
  },
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
      return;
    }
    res.redirect("/login");
  }
};
