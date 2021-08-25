import React from "react";

export default function ReceverText() {
  return (
    <>
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
    </>
  );
}
