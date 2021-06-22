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
  postImg: { type: String, require: false },
  postTitle: { type: String, require: false },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("mypost", mypostSchema);
