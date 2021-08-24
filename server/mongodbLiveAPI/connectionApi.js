const { use } = require("../route/posts");

require("dotenv").config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dataProject = process.env.DB_PROJECT;
// console.log(".env live", username, password, dataProject);
// const API = `mongodb+srv://${username}:${password}@cluster0.msxpf.mongodb.net/${dataProject}?retryWrites=true&w=majority`;
const API = "";
module.exports = API;
// DB_CONNESTION_URL = mongodb://localhost/node-react-api
