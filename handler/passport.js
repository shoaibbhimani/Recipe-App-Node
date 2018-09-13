const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    authenticate
  )
);

async function authenticate(username, password, done) {
  try {
    const user = await User.findOne({ email: username });
    const isValidPassport = await bcrypt.compare(password, user.hash);
    if (!user || !isValidPassport) {
      done(null, false, { errors: { "email or password": "is invalid" } });
      return;
    } else {
      done(null, user);
    }
  } catch (error) {
    done(error);
    return;
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById({
    _id: id
  });
  done(null, user);
});
