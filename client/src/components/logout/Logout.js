import React from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
function Logout() {
  let history = useHistory();
  localStorage.clear();
  window.location.reload();
  history.push("/");
}

export default Logout;
