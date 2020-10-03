require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
// const Schema = mongoose.Schema;
//console.log("ENV!!", process.env);

mongoose.set("debug", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
