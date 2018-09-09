const { check } = require("express-validator/check");
module.exports = {
  validateRegisterRecipe: [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    check("directions")
      .isLength({ min: 1 })
      .withMessage("must be at least 1 direction")
  ]
};
