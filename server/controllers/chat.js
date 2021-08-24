const registerModel = require("../models/register");
const { jwtVerify } = require("./factory_function/jetVerify");
// console.log("registerModel", registerModel);
exports.allUserGET = async (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];
  try {
    let decode = jwtVerify(token);
    console.log("id", decode.id);
    var allUseData = registerModel.find({});
    allUseData
      .exec()
      .then((data) => {
        res.json({
          data: data,
          loginUserId: decode.id,
          message: "[chat.js]",
        });
      })
      .catch((err) => {
        console.log("error", err);
        res.json({
          error: err,
          message: "chatcecfeded allUserData error",
        });
      });
    // console.log(allUseData);
  } catch (error) {
    console.log("dwdwwsws", error);
    res.json({
      error: error,
      message: "jwt error",
    });
  }
};
