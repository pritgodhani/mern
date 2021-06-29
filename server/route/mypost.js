const router = require("express").Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
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
        userData: userid,
        postImg: `addpost/` + postImgname,
        postTitle: mypostTitle,
      });
      dbMypostobj
        .save()
        .then((data) => {
          res.json({
            data: data,
            message: "post upload",
          });
        })
        .catch((err) => {
          console.log("err");
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
      // console.log("id", decode);
      // console.log(decode.id);
      var dbdata = mypostModel.find({ id: decode.id }).populate("userData");
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
router.post("/delete", (req, res, next) => {
  var postid = req.body.id;
  var dbData = mypostModel.findById(postid);
  dbData
    .exec()
    .then((data) => {
      console.log("data", data.postImg);
      var imgpath = data.postImg;
      if (fs.existsSync(`public/${imgpath}`)) {
        fs.unlinkSync(`public/${imgpath}`, (err) => {
          console.log(err);
        });
      }
      var deletePost = mypostModel.findByIdAndDelete({ _id: postid });
      deletePost
        .then((data) => {
          console.log(data);
          res.json({
            message: "post deleted",
          });
        })
        .catch((err) => {
          res.json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log("err", err);
      res.json({
        error: err,
        message: "error from deletpost",
      });
    });
});
module.exports = router;
