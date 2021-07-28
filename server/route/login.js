const express = require("express");
const route = express.Router();
const registerModel = require("../models/register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
route.post("/", (req, res, next) => {
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
});
module.exports = route;
