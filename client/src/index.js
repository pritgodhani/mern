import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Content from "./container/Content";
ReactDOM.render(
  // <provider>
  <BrowserRouter>
    <Content />
    <ToastContainer />
  </BrowserRouter>,
  // </provider>
  document.getElementById("root")
);
