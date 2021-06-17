const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/node-react-api",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

var proImgSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  imagePath: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profileImage", proImgSchema);
