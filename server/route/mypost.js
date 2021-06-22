const router = require("express").Router();
const jwt = require("jsonwebtoken");
const registerModel = require("../models/register");
const profileModel = require("../models/profile");
const mypostModel = require("../models/mypost");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/addpost");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
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
var uplod = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
router.post("/", uplod.single("image"), (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  var postImgname = req.file.filename;
  var mypostTitle = req.body.mptitle;
  //   jwd decode
  jwt.verify(token, "secret", (err, decode) => {
    if (err) {
      res.json({
        error: err,
        message: "jwt decode error",
      });
    }
    if (decode) {
      var userid = decode.id;
      var dbMypostobj = new mypostModel({
        id: userid,
        postImg: `addpost/` + postImgname,
        postTitle: mypostTitle,
      });
      dbMypostobj
        .save()
        .then((data) => {
          res.json({
            data: data,
            message: "save",
          });
        })
        .catch((err) => {
          res.json({
            error: err,
            message: "insert mypost error",
          });
        });
    }
  });
});
router.get("/", (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, decode) => {
    // console.log("decode", decode.id);
    if (err) {
      console.log("err", err);
      res.json({
        error: err,
        message: "Gmypost kwt error",
      });
    }
    if (decode) {
      console.log("id", decode);
      console.log(decode.id);
      var dbdata = mypostModel.find({ id: decode.id });
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
            message: "gdbmypost error",
          });
        });
    }
  });
});
router.get("/username", (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, decode) => {
    console.log("decode", decode.id);
    if (err) {
      console.log("err", err);
      res.json({
        error: err,
        message: "punamepost jwt error",
      });
    }
    if (decode) {
      console.log("id", decode);
      // console.log(decode.id);
      var dbdata = registerModel.findById(id);
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
            message: "gdbmypost error",
          });
        });
    }
  });
});

module.exports = router;
