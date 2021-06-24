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
  var token = req.header.authorization.split(" "[1]);
  console.log(token);
  var fUsername = req.body.name;
  var fEmail = req.body.email;
  var imageName = req.file.filename;
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (decoded) {
      var deletOddProImg = registerModel.findById(decoded.id);
      deletOddProImg
        .then((data) => {
          console.log(data);
          // if (fs.existsSync(`public/${oddimgname}`)) {
          //   fs.unlinkSync(`public/${oddimgname}`, (err) => {
          //     if (err) {
          //       console.log(err);
          //       res.json({
          //         error: err,
          //       });
          //     } else {
          //       console.log("Successfully deleted the file.");
          //     }
          //   });
          // }
          var registerDataUpdate = registerModel.findByIdAndUpdate(decoded.id, {
            userName: fUsername,
            email: fEmail,
            image: "profileImg/" + imageName,
          });
          registerDataUpdate
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
        })
        .catch((err) => {
          res.json({
            error: err,
            Message: "pid error",
          });
        });
    }
  });
});
route.post("/updateimg", upload.single("image"), (req, res, next) => {
  var imageName = req.file.filename;
  // console.log("photo", req.file);
  var token = req.headers.authorization.split(" ")[1];
  // var image = req.file.path;
  console.log("token", token);
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
        .then((dbdata) => {
          // console.log("dataout", dbdata[0].imagePath);
          if (dbdata.length > 0) {
            console.log("data", dbdata);
            console.log("dataout", dbdata[0].imagePath);
            var oddimgname = dbdata[0].imagePath;
            // console.log(data[0].imagePath);
            if (fs.existsSync(`public/${oddimgname}`)) {
              fs.unlinkSync(`public/${oddimgname}`, (err) => {
                if (err) {
                  console.log(err);
                  res.json({
                    error: err,
                  });
                } else {
                  console.log("Successfully deleted the file.");
                }
              });
            }

            var updateprofile = proImgModel.findOneAndUpdate(
              { id: decoded.id },
              {
                imagePath: "profileImg/" + imageName,
              }
            );
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
              imagePath: "profileImg/" + imageName,
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
