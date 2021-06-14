import React from "react";
import { useHistory } from "react-router-dom";
function Logout() {
  let history = useHistory();
  localStorage.removeItem("token");
  window.location.reload();
  history.push("/login");
  // window.location.href = "/login";

  // console.log(history);
  return <>logout</>;
}

export default Logout;
