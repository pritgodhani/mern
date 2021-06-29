const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/node-react-api",
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
  { useFindAndModify: true }
);

var mypostSchema = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "userData",
    default: null,
  },
  postImg: {
    type: String,
    default: null,
  },
  postTitle: {
    type: String,
    default: null,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("mypost", mypostSchema);
