const express = require("express");
var jwt = require("jsonwebtoken");
const route = express.Router();
const registerModel = require("../models/register");
route.post("/", (req, res, next) => {
  let token = req.body.token;
  // console.log(token);
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (decoded) {
      console.log(decoded.id);
      var dbData = registerModel.findById(decoded.id);
      dbData
        .exec()
        .then((data) => {
          console.log(data);
          res.json({
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            error: err,
          });
        });
    }
  });
});
route.post("/update", (req, res, next) => {
  var fUsername = req.body.name;
  var fEmail = req.body.email;
  var token = req.body.token;
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (decoded) {
      console.log(decoded.id);
      var dbData = registerModel.findByIdAndUpdate(decoded.id);
      var updateObj = new registerModel({
        userName: fUsername,
        email: fEmail,
      });
      updateObj
        .save()
        .then((data) => {
          // console.log(data);
          res.json({
            massege: "update succesefully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            error: err,
          });
        });
    }
  });
});
module.exports = route;
