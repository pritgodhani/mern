import React from "react";
import Frd from "./subComp/Friend";

import Container from "@material-ui/core/Container";
import "./chat.css";
export default function Chat() {
  return (
    <>
      <div>
        <div className="frd">
          <Frd />
        </div>
        <div className="chatDIV">
          <Container maxWidth="sm">
            <Frd />
          </Container>
        </div>
      </div>
    </>
  );
}
