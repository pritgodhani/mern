import React from "react";
import Frd from "./subComp/Friend";

import Container from "@material-ui/core/Container";
import "./chat.css";
export default function Chat() {
  return (
    <>
      <div>
        <div className="frd"></div>
        <div className="chatDIV">
          <Container maxWidth="sm"></Container>
        </div>
      </div>
    </>
  );
}
