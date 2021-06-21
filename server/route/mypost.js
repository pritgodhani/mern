const router = require("express").Router();
const jwt = require("jsonwebtoken");
const registerModel = require("../models/register");
const profileModel = require("../models/profile");
const mypostModel = require("../models/mypost");
router.post("/", (req, res, next) => {
  var token = req.headers;
  console.log("token", token);
  var mypostimg = req.body.mypostimg;
  var myposttitle = req.body.mptitle;
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
      console.log(userid);
      // var dbusername = registerModel.findById(userid);
      // dbusername
      //   .exec()
      //   .then((data) => {
      //     console.log(data.userName);
      //     var dbusername = data.userName;
      //   })
      //   .catch((err) => {
      //     console.log("username error", err);
      //   });
      // var dbprofileimg = profileModel.findOne({ id: userid });
      // dbprofileimg
      //   .exec()
      //   .then((data) => {
      //     console.log("primg", data.imagePath);
      //     var dbprofilepath = data.imagePath;
      //   })
      //   .catch((err) => {
      //     console.log("primg error", err);
      //   });
      var dbMypostobj = new mypostModel({
        id: userid,
        postImg: mypostimg,
        postTitle: myposttitle,
      });
      dbMypostobj.save().then((data) => {
        res.json({
          data: data,
          username: dbusername,
          dbprofilepath: dbprofilepath,
        });
      });
    }
  });
});

module.exports = router;
