const express = require("express");
var jwt = require("jsonwebtoken");
const route = express.Router();
const multer = require("multer");
const registerModel = require("../models/register");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profileImg/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  // console.log(file.mimetype);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
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

route.post("/update", upload.single("image"), (req, res, next) => {
  console.log(req.file.path);

  var fUsername = req.body.name;
  var fEmail = req.body.email;
  var token = req.body.token;
  var image = req.file.path;
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (decoded) {
      // console.log(decoded.id);
      var dbData = registerModel.findByIdAndUpdate(decoded.id);
      var updateObj = new registerModel({
        userName: fUsername,
        email: fEmail,
        image: image,
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
