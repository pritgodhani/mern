import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import Axios from "axios";
import Search from "./chatComponents/Search";
import User from "./chatComponents/User";
import io from "socket.io-client";
import ReceverText from "./chatComponents/ReceverText";
import SenderText from "./chatComponents/SenderText";
const ENDPOINT = "localhost:5000";

export default function Chat() {
  // console.log("chat function");
  const token = localStorage.getItem("token");
  const [loginUsers, setLoginUsers] = useState();
  const [receverUsers, setReceverUsers] = useState(null);
  const [users, setUsers] = useState();
  const socket = useRef();
  useEffect(() => {
    allUser();
  }, []);
  function receverUser(data) {
    setReceverUsers(data);
  }
  console.log("receverUsers", receverUsers);
  //
  // socketio-client
  useEffect(() => {
    socket.current = io(ENDPOINT);
  }, []);
  useEffect(() => {
    // console.log("userid", loginUsers);
    socket.current.emit("addUser", loginUsers?.[0]._id);
    socket.current.on("getUser", (user) => {
      console.log("users", user);
    });
    // //
  }, [loginUsers]);
  // console.log(socket);
  //
  function allUser() {
    let datdda = Axios.get("http://localhost:5000/allUser", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    datdda
      .then((result) => {
        let data = result.data.data;
        let loginUserId = result.data.loginUserId;
        let withoutLoginUsers = data?.filter((user) => {
          return loginUserId !== user._id;
        });
        let LoginUser = data?.filter((user) => {
          return loginUserId === user._id;
        });

        // console.log("LoginUsers", LoginUser);
        // console.log("withoutLoginUsers", withoutLoginUsers);
        // console.log("userdata", result.data);
        // console.log("loginUserId", loginUserId);
        // console.log("data", data);
        setLoginUsers(LoginUser);
        setUsers(withoutLoginUsers);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  // console.log("user", users);
  // const userSelect =
  const userSelect = users?.map((user, index) => {
    // console.log("efe");
    return <User key={index} user={user} receverUser={receverUser} />;
    // <User />;
  });

  return (
    <>
      <div>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="container">
          {/* <!-- Page header start --> */}
          <div className="page-title">
            <div className="row gutters">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <h5 className="title">Chat App</h5>
              </div>
              {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                "fefefefsrfzsf "
              </div> */}
            </div>
          </div>
          {/* <!-- Page header end --> */}

          {/* <!-- Content wrapper start --> */}
          <div className="content-wrapper">
            {/* <!-- Row start --> */}
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card m-0">
                  {/* <!-- Row start --> */}
                  <div className="row no-gutters">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                      <div className="users-container">
                        {/* {console.log(loginUsers[0].userName)} */}
                        {/* <h3>{loginUsers[0].userName}</h3> */}
                        <Search />
                        <ul className="users">
                          {/* <User /> */}
                          {userSelect}
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                      <div className="selected-user">
                        {receverUsers ? (
                          <span>
                            To:
                            <span className="name">
                              {receverUsers?.userName}
                            </span>
                          </span>
                        ) : null}
                      </div>
                      <div className="chat-container">
                        <ul className="chat-box chatContainerScroll">
                          <ReceverText />
                          <SenderText />
                        </ul>
                        <div className="form-group mt-3 mb-0">
                          <form action="#" method="post">
                            <div class="input-group">
                              {" "}
                              <input
                                type="text"
                                name="message"
                                placeholder="Type Message ..."
                                class="form-control"
                              />{" "}
                              <span class="input-group-btn">
                                {" "}
                                <button type="button" class="btn btn-info">
                                  Send
                                </button>{" "}
                              </span>{" "}
                            </div>
                          </form>
                          {/* <textarea
                              className="form-control"
                              rows="3"
                              placeholder="Type your message here..."
                            ></textarea>
                            <button className="form-control">send</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Row end --> */}
                </div>
              </div>
            </div>
            {/* <!-- Row end --> */}
          </div>
          {/* <!-- Content wrapper end --> */}
        </div>
      </div>
    </>
  );
}
