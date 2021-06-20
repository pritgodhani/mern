const mongoose = require("mongoose");
const { schema } = require("./profile");
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
  image: { type: mongoose.Schema.Types.ObjectId, ref: "profileImage" },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userData", registerSchema);
