import React, { useState, useEffect } from "react";
import "./chat.css";
import Axios from "axios";
import Search from "./chatComponents/Search";
import User from "./chatComponents/User";
import io from "socket.io-client";
const ENDPOINT = "localhost:5000";
var socket;
export default function Chat() {
  const token = localStorage.getItem("token");
  const [loginUsers, setLoginUsers] = useState();
  const [users, setUsers] = useState();
  useEffect(() => {
    allUser();
  }, []);
  socket = io(ENDPOINT);
  // console.log("ioc", socket);
  socket.emit("connection", () => {
    console.log("socketcClient successfuly!!!");
  });
  socket.on("connection", () => {
    console.log("socketcClient successfuly!!!");
  });
  function allUser() {
    // console.log("gwenouhnfiy");
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
    return <User key={index} user={user} />;
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
                        <span>
                          To: <span className="name">Emily Russell</span>
                        </span>
                      </div>
                      <div className="chat-container">
                        <ul className="chat-box chatContainerScroll">
                          <li className="chat-left">
                            <div className="chat-avatar">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                alt="Retail Admin"
                              />
                              <div className="chat-name">Russell</div>
                            </div>
                            <div className="chat-text">
                              Hello, I'm Russell.
                              <br />
                              How can I help you today?
                            </div>
                            <div className="chat-hour">
                              08:55 <span className="fa fa-check-circle"></span>
                            </div>
                          </li>
                          <li className="chat-right">
                            <div className="chat-hour">
                              08:56 <span className="fa fa-check-circle"></span>
                            </div>
                            <div className="chat-text">
                              Hi, Russell
                              <br /> I need more information about Developer
                              Plan.
                            </div>
                            <div className="chat-avatar">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                alt="Retail Admin"
                              />
                              <div className="chat-name">Sam</div>
                            </div>
                          </li>
                        </ul>
                        <div className="form-group mt-3 mb-0">
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Type your message here..."
                          ></textarea>
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
