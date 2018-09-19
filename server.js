const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const flash = require("express-flash-notification");
require("dotenv").config();
require("express-async-errors");

//Database Configuration
require("./mongoose");

//Models
require("./models/Recipe");
require("./models/User");

//Configuration
require("./handler/multer");
require("./handler/cloudinary");
require("./handler/passport");

//Set Templating Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//MiddleWare
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use(cookieParser())
  .use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true
    })
  )
  .use(morgan("dev"))
  .use(passport.initialize())
  .use(passport.session());

app.use(flash(app));

//Make Variable Avaliable to all Partials
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use("/", require("./routes/recipe")).use("/", require("./routes/auth"));

//Not Found Route
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.render("error", {
      title: "Error",
      message: error.message
    });
  });
} else {
  app.use((error, req, res, next) => {
    res.render("error", {
      message: error.message,
      stack: error.stack
    });
  });
}

//Server
const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server is ${PORT}`);
});
