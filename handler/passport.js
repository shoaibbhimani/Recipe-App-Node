const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (req, username, password, done) => {
      console.log(username, password);
      try {
        const user = await User.find({ email: username });
        const isValidPassport = await bcrypt.compare(password, user.hash);
        if (!user || !isValidPassport) {
          done(null, false, { errors: { "email or password": "is invalid" } });
          return;
        }
      } catch (error) {
        done(error);
        return;
      }

      done(null, true);
    }
  )
);
