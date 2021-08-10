const registerModel = require("../models/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerGET = (req, res, next) => {
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

  await bcrypt.hash(password, 10, (err, pass) => {
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
exports.Login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var registerDb = registerModel.find({ email: email });
  registerDb
    .exec()
    .then((data) => {
      if (data.length < 1) {
        res.json({
          error: "Auth failed 1",
        });
      } else {
        // console.log(data[0].password);
        // console.log(password);

        bcrypt.compare(password, data[0].password, (err, result) => {
          // error part
          if (err) {
            res.json({
              error: "auth failed 2",
            });
          }
          //  result = true
          if (result) {
            var token = jwt.sign({ id: data[0]._id }, "secret");
            res.status(200).json({
              Messege: "success",
              Token: token,
            });
          } else {
            res.json({
              error: "auth failed 3",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};
