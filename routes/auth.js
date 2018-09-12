const router = require("express").Router();

router
  .get("/login", (req, res) => {
    res.render("login", {
      title: "Login"
    });
  })
  .get("/signup", (req, res) => {
    res.render("signup", {
      title: "Sign Up"
    });
  })
  .post("/check/login", (req, res) => {
    res.redirect("/");
  });

module.exports = router;
