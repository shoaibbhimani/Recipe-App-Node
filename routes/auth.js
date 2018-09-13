const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = mongoose.model("User");

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
  .get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  })
  .post(
    "/validate_user",
    passport.authenticate("local", {
      failureRedirect: "/login",
      // failureFlash: "Failed Login!",
      successRedirect: "/"
      // successFlash: "You are now logged in!"
    })
  )
  .post("/create_user", async (req, res) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User();
    user.email = req.body.email;
    user.hash = hash;
    await user.save();
    res.send({ ok: true });
  })
  .get("/user", (req, res) => {
    res.send({
      isLoggedIn: req.isAuthenticated(),
      user: req.user,
      cookies: req.cookies
    });
  });

module.exports = router;
