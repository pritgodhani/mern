const router = require("express").Router();
const { allUserGET } = require("../controllers/chat");
// const fs = require("fs");
// const multer = require("multer");
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/addpost");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   // console.log(file.mimetype);
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// var upload = multer({
//   storage: storage,
//   limits: {
//     fieldSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });
router.get("/", allUserGET);

module.exports = router;
