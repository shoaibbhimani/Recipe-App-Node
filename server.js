const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const jimp = require("jimp");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");

//Configuration
require("./handler/multer");
require("./handler/cloudinary");

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
app.use("/", require("./routes/recipe"));

//Server
const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server is ${PORT}`);
});
