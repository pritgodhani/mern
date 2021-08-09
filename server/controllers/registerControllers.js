const registerModel = require("../models/register");
const bcrypt = require("bcrypt");
exports.registerGET = async (req, res, next) => {
  var data = registerModel.find({});
  data
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json("data not found");
    });
};
exports.registerPOST = async (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  if (!username) {
    res.json({
      error: "plese enter username(sr)",
    });
  }
  if (!email) {
    res.json({
      error: "plese enter email(sr)",
    });
  }
  if (!password) {
    res.json({
      error: "plese enter password(sr)",
    });
  }

  bcrypt.hash(password, 10, (err, pass) => {
    // console.log("err", err);
    // console.log("pass", pass);
    if (err) {
      res.json({
        error: "form error",
      });
    } else {
      var userdata = new registerModel({
        userName: username,
        email: email,
        password: pass,
      });
      userdata
        .save()
        .then((data) => {
          res.status(201).json({
            message: "data inserted successfuly",
            record: data,
          });
        })
        .catch((err) => {
          res.json({
            error:
              err.code === 11000 ? "Email already in used" : "Databse error!",
          });
        });
    }
  });
};
