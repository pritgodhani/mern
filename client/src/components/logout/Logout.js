// import React from "react";
import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
function Logout() {
  let history = useHistory();
  localStorage.clear();
  window.location.reload();
  history.push("/");
  // window.location.href = "http://localhost:3000/login";
  // window.location.href = "http://localhost:3000/login";

  // console.log(history);
  // <Redirect to="/" />;
}

export default Logout;
