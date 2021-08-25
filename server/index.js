const express = require("express");
// const creactErrror = require("http-errors");
const cors = require("cors");
// const mongoose = require("mongoose");
const posts = require("./route/posts");
const register = require("./route/register");
const login = require("./route/login");
const profile = require("./route/profile");
const mypost = require("./route/mypost");
const allpost = require("./route/allPost");
const allUserChat = require("./route/chat");
// const formmodel = require("./models/formData");
const app = express();

const socketio = require("socket.io");

const http = require("http");
const server = http.createServer(app);
//
//
//
const io = socketio(server, { cors: { origin: "http://localhost:3000" } });
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (soketId) => {
  console.log("socketis", soketId);
  users = users.filter((user) => user.socketId !== soketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  console.log("socketio conneced!!", socket.id);
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // console.log(userId);
    io.emit("getUser", users);
  });
  socket.on("sendMessage", ({ senderId, receverId, Text }) => {
    const user = getUser(receverId);
    io.to(user.socketId).emit("recevMessage", { senderId, Text });
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
  // socket.on("desconnect", () => {
  //   console.log("rffwefwedfedqe");
  //   console.log("user disconnected");
  //   removeUser(socket.id);
  //   io.emit("getUser", users);
  // });
});
//
//
//
//
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/form", posts);
app.use("/register", register);
app.use("/login", login);
app.use("/profile", profile);
app.use("/mypost", mypost);
app.use("/allpost", allpost);
app.use("/allUser", allUserChat);
// const CONECTION_URL = "mongodb://localhost/node-react-api";
const PORT = process.env.PORT || 5000;

// async () =>
//   await mongoose.connect(CONECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true,
//   });
server.listen(PORT, () => console.log(`server runing port is: ${PORT}`));
// app.use((req, res, next) => {
//   next(creactErrror(404));
// });
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   //   res.render('error');
//   res.status(404).json({
//     error: "page not found",
//   });
//   res.status(500).json({
//     error: "internal server error",
//   });
// });
