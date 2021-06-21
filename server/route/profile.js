const express = require("express");
var jwt = require("jsonwebtoken");
const route = express.Router();
const multer = require("multer");
const registerModel = require("../models/register");
const proImgModel = require("../models/profile");
var fs = require("fs");
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
        error: "token decord error",
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
route.post("/updateEmailAndUsername", (req, res, next) => {
  var fUsername = req.body.name;
  var fEmail = req.body.email;
  var token = req.body.token;
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (decoded) {
      var profielEmailAndUsername = registerModel.findByIdAndUpdate(
        decoded.id,
        {
          userName: fUsername,
          email: fEmail,
        }
      );
      profielEmailAndUsername
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
route.post("/updateimg", upload.single("image"), (req, res, next) => {
  console.log("image");
  var imagepath = req.file.filename;
  // console.log("photo", req.file);
  var token = req.body.token;
  // var image = req.file.path;
  // console.log("token", token);
  jwt.verify(token, "secret", (err, decoded) => {
    // console.log("jwt");
    if (err) {
      res.json({
        error: "token error",
      });
    }
    if (decoded) {
      console.log(decoded.id);
      var upAndInProPath = proImgModel.find({ id: decoded.id });
      upAndInProPath
        .exec()
        .then((data) => {
          console.log("data", data.length);
          if (data.length > 0) {
            // console.log(data[0].imagePath);

            var updateprofile = proImgModel.findOneAndUpdate(
              { id: decoded.id },
              {
                imagePath: "profileImg/" + imagepath,
              }
            );
            console.log("image");
            updateprofile
              .then((data) => {
                res.json({
                  massege: "update succesfuly",
                  data: data,
                });
              })
              .catch((err) => {
                res.json({
                  error: err,
                });
              });
          } else {
            console.log("save image");
            var imagePath = new proImgModel({
              id: decoded.id,
              imagePath: "profileImg/" + imagepath,
            });
            imagePath
              .save()
              .then((data) => {
                res.json({
                  massege: "saved",
                  data: data,
                });
              })
              .catch((err) => {
                res.json({
                  error: err,
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
route.post("/imagepath", (req, res, next) => {
  var cid = req.body.id;
  // console.log(cid);
  var dbdata = proImgModel.findOne({ id: cid });
  dbdata
    .exec()
    .then((data) => {
      // console.log(data);
      res.json({
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        error: "imagepath",
        realerror: err,
      });
    });
});

module.exports = route;
