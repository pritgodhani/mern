const mypostModel = require("../models/mypost");
const jwt = require("jsonwebtoken");

exports.mypostGET = (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, decode) => {
    if (err) {
      console.log("err", err);
      res.json({
        error: err,
        message: "Gmypost kwt error",
      });
    }
    if (decode) {
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
};
exports.mypostPOST = (req, res, next) => {
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
          console.log("picError", err);
          res.json({
            error: err,
            message: "insert mypost error",
          });
        });
    }
  });
};
exports.mypostDELET = (req, res, next) => {
  var postid = req.body.id;
  var dbData = mypostModel.findById(postid);
  dbData
    .exec()
    .then((data) => {
      // console.log("data", data.postImg);
      var imgpath = data.postImg;
      if (fs.existsSync(`public/${imgpath}`)) {
        fs.unlinkSync(`public/${imgpath}`, (err) => {
          console.log(err);
        });
      }
      var deletePost = mypostModel.findByIdAndDelete({ _id: postid });
      deletePost
        .then((data) => {
          // console.log(data);
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
};
exports.mypostlikeGET = (req, res, next) => {
  var postL_UserToken = req.headers.authorization.split(" ")[1];
  var postid = req.query.postid;
  // var postid = "610100515f973b33935dcc6f";
  jwt.verify(postL_UserToken, "secret", (err, decode) => {
    if (err) {
      console.log("err", err);
      res.json({
        error: err,
        message: "Gmypost kwt error likepost",
      });
    }
    if (decode) {
      var dbData = mypostModel.findById(postid);
      dbData
        .exec()
        .then(async (data) => {
          // console.log("data", data.postImg);
          res.json({
            likeUserId: decode.id,
            data: data,
          });
        })
        .catch((err) => {
          console.log("like get backenderr", err);
          res.json({
            error: err,
            message: "error from likePost",
          });
        });
    }
  });
};
exports.mypostlikePOST = (req, res, next) => {
  var postid = req.body.id;
  var newClicklike = req.body.like;
  // console.log(newClicklike);
  var postL_UserToken = req.headers.authorization.split(" ")[1];
  // console.log("token user Q=====>", postL_UserToken);
  jwt.verify(postL_UserToken, "secret", async (err, decode) => {
    if (err) {
      console.log("err", err);
      res.json({
        error: err,
        message: "Gmypost kwt error likepost",
      });
    }
    if (decode) {
      var likePost = await mypostModel.findById(postid);
      let ArratUserIndex = likePost.postLike.findIndex((item) => {
        return item.postLikeUserId === decode.id;
      });
      let ArratUserData = likePost.postLike.filter((item) => {
        // console.log("filter_item", item.postLikeUser);
        return item.postLikeUserId === decode.id;
      });

      if (ArratUserData.length > 0) {
        // console.log("newClicklikeIn=>", newClicklike);
        // console.log("dupData", likePost.postLike[ArratUserIndex]);
        likePost.postLike[ArratUserIndex].like = newClicklike;
        // console.log("test......");
        likePost
          .save()
          .then((data) => {
            res.json({
              message: "post likeed",
              data: data,
            });
          })
          .catch((err) => {
            console.log("post mrthod like error=>", err);
            res.json({
              error: err,
            });
          });
      } else {
        console.log("else part");
        likePost.postLike.push({
          postLikeUserId: decode.id,
          postLikeUser: decode.id,
          like: newClicklike,
        });
        likePost
          .save()
          .then((data) => {
            res.json({
              message: "post likeed",
              data: data,
            });
          })
          .catch((err) => {
            console.log("post mrthod like error=>", err);
            res.json({
              error: err,
            });
          });
      }
    }
  });
};
