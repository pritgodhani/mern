import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

import Content from "./container/Content";
ReactDOM.render(
  <BrowserRouter>
    <Content />
  </BrowserRouter>,
  document.getElementById("root")
);
