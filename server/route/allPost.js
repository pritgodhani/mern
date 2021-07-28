const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mypostModel = require("../models/mypost");
router.get("/", (req, res, next) => {
  // console.log("all");
  var token = req.headers.authorization.split(" ")[1];
  // console.log("token", token);
  jwt.verify(token, "secret", (err, decode) => {
    // console.log("decode", decode.id);
    if (err) {
      console.log("err", err);
      res.json({
        error: err,
        message: "Gallpost jwt error",
      });
    }
    if (decode) {
      var dbdata = mypostModel.find({}).populate("userData");
      dbdata
        .exec()
        .then((data) => {
          console.log("adddata", data);
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
