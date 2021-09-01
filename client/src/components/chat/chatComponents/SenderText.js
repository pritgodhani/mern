import React from "react";

export default function SenderText(props) {
  const SenderText = props.SenderText;
  const senderData = props.senderData;
  // console.log("[SenderText.js]SenderText", SenderText);
  // console.log("[SenderText.js]senderData", senderData);
  return (
    <>
      <li className="chat-right">
        <div className="chat-hour">
          {Date.now()} <span className="fa fa-check-circle"></span>
        </div>
        <div className="chat-text">
          {/* Hi, Russell */}
          {SenderText.Text}
        </div>
        <div className="chat-avatar">
          <img
            src={`http://localhost:5000/${senderData.image}`}
            alt="Retail Admin"
          />
          <div className="chat-name">{senderData.userName}</div>
        </div>
      </li>
    </>
  );
}
