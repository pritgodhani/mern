import React from "react";

export default function SenderText(props) {
  const SenderText = props.SenderText;
  const senderData = props.loginUsers;
  console.log("SenderText", SenderText);
  console.log("senderData", senderData);
  return (
    <>
      <li className="chat-right">
        <div className="chat-hour">
          08:56 <span className="fa fa-check-circle"></span>
        </div>
        <div className="chat-text">
          Hi, Russell
          <br /> I need more information about Developer Plan.
        </div>
        <div className="chat-avatar">
          <img
            src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
            alt="Retail Admin"
          />
          <div className="chat-name">Sam</div>
        </div>
      </li>
    </>
  );
}
