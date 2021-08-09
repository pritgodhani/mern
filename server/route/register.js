const express = require("express");
const route = express.Router();
const registerModel = require("../models/register");

const {
  registerGET,
  registerPOST,
} = require("../controllers/registerControllers");
route.get("/", registerGET);
route.post("/", registerPOST);
module.exports = route;
