const express = require("express");
var jwt = require("jsonwebtoken");
const route = express.Router();
const multer = require("multer");
const registerModel = require("../models/register");
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
route.get("/", (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

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
route.post("/", upload.single("image"), (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  var fUsername = req.body.name;
  var fEmail = req.body.email;
  if (!req.file) {
    console.log("only UN & E");
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({
          error: err,
          message: "jwt error",
        });
      }

      if (decoded) {
        let registerDataUpdate = registerModel.findByIdAndUpdate(decoded.id, {
          userName: fUsername,
          email: fEmail,
        });
        registerDataUpdate
          .then((data) => {
            res.json({
              message: "updated",
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
  } else {
    var imageName = req.file.filename;
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({
          error: err,
          message: "jwt error",
        });
      }
      if (decoded) {
        let deletOddProImg = registerModel.findById(decoded.id);
        deletOddProImg
          .then((data) => {
            console.log("userdata", data);
            let oddimgname = data.image;
            if (fs.existsSync(`public/${oddimgname}`)) {
              fs.unlinkSync(`public/${oddimgname}`, (err) => {
                if (err) {
                  res.json({
                    error: err,
                  });
                } else {
                  console.log("Successfully deleted the file.");
                }
              });
            }
            let registerDataUpdate = registerModel.findByIdAndUpdate(
              { _id: decoded.id },
              {
                userName: fUsername,
                email: fEmail,
                image: "profileImg/" + imageName,
              }
            );
            registerDataUpdate
              .then((data) => {
                res.json({
                  message: "updated",
                  data: data,
                });
              })
              .catch((err) => {
                res.json({
                  error:
                    err.code === 11000
                      ? "Email already in used"
                      : "Databse error!",
                });
              });
          })
          .catch((err) => {
            res.json({
              error: err,
              Message: "pid error",
            });
          });
      }
    });
  }
});

module.exports = route;
