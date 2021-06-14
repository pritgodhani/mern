const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/node-react-api",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

var registerSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userData", registerSchema);
