var jwt = require("jsonwebtoken");

exports.jwtVerify = (token) => {
  //   console.log("token")

  return jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      // console.log("jet");
      throw err;
    }
    if (decoded) {
      // console.log("resposns jwt", decoded);
      return decoded;
    }
  });
};
