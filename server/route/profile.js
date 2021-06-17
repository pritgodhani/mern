const express = require("express");
var jwt = require("jsonwebtoken");
const route = express.Router();
const multer = require("multer");
const registerModel = require("../models/register");
const proImgModel = require("../models/profile");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profileImg/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
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

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (decoded) {
      var dbData = registerModel.findById(decoded.id);
      dbData
        .exec()
        .then((data) => {
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
  var imagepath = req.file.filename;
  console.log(req.file);
  var fUsername = req.body.name;
  var fEmail = req.body.email;
  var token = req.body.token;
  // var image = req.file.path;
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (decoded) {
      var imagePath = new proImgModel({
        id: decoded.id,
        imagePath: "profileImg/" + imagepath,
      });
      imagePath
        .save()
        .then((data) => {
          res.json({
            massege: "save",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            error: err,
          });
        });
      registerModel.findByIdAndUpdate(
        decoded.id,
        {
          userName: fUsername,
          email: fEmail,
        },
        (err, data) => {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (data) {
            res.json({
              massege: "update succesefully",
              data: data,
            });
          }
        }
      );
    }
  });
});
route.post("/imagepath", (req, res, next) => {
  var id = req.body.id;
  var dbdata = proImgModel.find((id = id));
  dbdata
    .exec()
    .then((data) => {
      res.json({
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

module.exports = route;
