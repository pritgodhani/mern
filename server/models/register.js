const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/node-react-api",
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
  { useFindAndModify: true }
);

var registerSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, require: true },
  image: { type: String, default: null },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userData", registerSchema);
