require("dotenv").config();
const mongoose = require("mongoose");

const dbLiveConnection = require("../mongodbLiveAPI/connectionApi");
const dbLocalCanection = process.env.DB_CONNESTION_URL;
// console.log("API", dbLiveConnection);
if (dbLiveConnection) {
  var conect = dbLiveConnection;
} else {
  var conect = dbLocalCanection;
}
const connection = mongoose
  .connect(
    conect,
    { useCreateIndex: true },
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    { useFindAndModify: true }
  )
  .then((result) => {
    console.log("connection successfily");
  })
  .catch((err) => {
    console.log("connection err", err);
  });
module.exports = connection;
