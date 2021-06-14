import React from "react";
import Navbar from "../navbar/Navbar";
import Home from "../components/home/Home";
import Addpost from "../components/addpost/Addpost";
import Mypost from "../components/mypost/Mypost";
import Profile from "../components/profile/Profile";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import NF from "../components/notfountpage/Notfountpage";
import Logout from "../components/logout/Logout";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Content() {
  const lToken = localStorage.getItem("token");
  if (lToken) {
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {(() => {
              if (lToken) {
                return <NF />;
              } else {
                return <Home />;
              }
            })()}
          </Route>
          <Route path="/AddPost">
            {(() => {
              if (lToken) {
                return <Addpost />;
              } else {
                return <NF />;
              }
            })()}
          </Route>
          <Route path="/MyPost">
            {(() => {
              if (lToken) {
                return <Mypost />;
              } else {
                return <NF />;
              }
            })()}
          </Route>
          <Route path="/profile">
            {(() => {
              if (lToken) {
                return <Profile />;
              } else {
                return <NF />;
              }
            })()}
          </Route>
          <Route path="/login">
            {(() => {
              if (lToken) {
                return <NF />;
              } else {
                return <Login />;
              }
            })()}
          </Route>
          <Route path="/logout">
            {(() => {
              if (lToken) {
                return <Logout />;
              } else {
                return <NF />;
              }
            })()}
          </Route>
          {/* {(() => {
            if (lToken) {
              return (
                <Route path="/logout">
                  <Logout />
                </Route>
              );
            } else {
              return (
                <Route path="/login">
                  <Login />
                </Route>
              );
            }
          })()} */}

          <Route path="/regster">
            {(() => {
              if (lToken) {
                return <NF />;
              } else {
                return <Register />;
              }
            })()}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Content;
