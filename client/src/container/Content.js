import React from "react";
import Navbar from "../components/navbar/Navbar";
// import Home from "../components/home/Home";
import Addpost from "../components/addpost/Addpost";
import Mypost from "../components/mypost/Mypost";
import Profile from "../components/profile/Profile";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import NF from "../components/notfountpage/Notfountpage";
import Logout from "../components/logout/Logout";
import Chat from "../components/chat/Chat";

import { Route, Switch } from "react-router-dom";

function Content() {
  const lToken = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Switch>
        {lToken ? (
          <>
            <Route path="/AddPost" exact component={Addpost} />
            <Route path="/Chat" exact component={Chat} />
            <Route path="/MyPost" exact component={Mypost} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/AddPost/*" component={NF} />
            <Route path="/Chat/*" component={NF} />
            <Route path="/MyPost/*" component={NF} />
            <Route path="/profile/*" component={NF} />
            <Route path="/logout/*" component={NF} />
          </>
        ) : (
          <>
            <Route path="/" exact component={Login} />
            <Route path="/regster" exact component={Register} />
            <Route path="/regster/*" component={NF} />
            {/* <Route path="/*" component={NF} /> */}
          </>
        )}
      </Switch>
    </>
  );
}

export default Content;
