var jwt = require("jsonwebtoken");
const registerModel = require("../models/register");
var fs = require("fs");
const { jwtVerify } = require("./jwt/jetVerify");
exports.profileGET = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  // console.log("jwtVerify", jwtVerify("token"));
  // // console.log("token", token);
  let userdwdedwqid = jwtVerify(token);
  console.log("function jwt", userdwdedwqid);
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
};
exports.profilePOST = (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  var fUsername = req.body.name;
  var fEmail = req.body.email;
  // console.log("postprofile", token, fUsername, fEmail, req.file);
  if (!req.file) {
    // console.log("only UN & E");
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
    console.log("else", imageName, token);
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({
          error: err,
          message: "jwt error",
        });
      }
      if (decoded) {
        // console.log("id", decoded.id);
        let deletOddProImg = registerModel.findById(decoded.id);
        deletOddProImg
          .then((data) => {
            // console.log("userdata", data);
            let oddimgname = data.image;
            if (fs.existsSync(`public/${oddimgname}`)) {
              fs.unlinkSync(`public/${oddimgname}`, (err) => {
                if (err) {
                  res.json({
                    error: err,
                  });
                } else {
                  // console.log("Successfully deleted the file.");
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
            // console.log(err);
            res.json({
              error: err,
              Message: "pid error",
            });
          });
      }
    });
  }
};
