const express = require("express");
const creactErrror = require("http-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const posts = require("./route/posts");
const register = require("./route/register");
const login = require("./route/login");
const profile = require("./route/profile");
const mypost = require("./route/mypost");
const formmodel = require("./models/formData");
const app = express();
app.use(express.json());

app.use(cors());
app.use(express.static("public"));
app.use("/form", posts);
app.use("/register", register);
app.use("/login", login);
app.use("/profile", profile);
app.use("/mypost", mypost);
const CONECTION_URL = "mongodb://localhost/node-react-api";
const PORT = process.env.PORT || 5000;

async () =>
  await mongoose.connect(CONECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });

app.listen(PORT, () => console.log(`server runing port is: ${PORT}`));

app.use((req, res, next) => {
  next(creactErrror(404));
});
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //   res.render('error');
  res.status(404).json({
    error: "page not found",
  });
  res.status(500).json({
    error: "internal server error",
  });
});
