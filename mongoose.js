const mongoose = require("mongoose");
const mongoDBErrors = require("mongoose-mongodb-errors");

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connection.on("error", err => {
  console.error(`${err.message}`);
});
