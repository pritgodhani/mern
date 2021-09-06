import React from "react";

export default function ReceverText(props) {
  var users = props.users;
  var receverMessageObj = props.receverMessageObj;
  // console.log("[RecevText.js]receverMessageObj", receverMessageObj);
  var senderUser = users.filter((user) => {
    return user._id === receverMessageObj?.senderId;
  });



  console.log("[RecevText.js]senderUser", senderUser);
  return (
    <>
      <li className="chat-left">
        <div className="chat-avatar">
          <img
            src={`http://localhost:5000/${senderUser[0].image}`}
            alt="Retail Admin"
          />

          <div className="chat-name">{senderUser[0].userName}</div>
        </div>
        <div className="chat-text">
          {/* Hello, I'm Russell.
          <br /> */}
          {receverMessageObj.text?receverMessageObj.text:receverMessageObj.Text}
        </div>
        <div className="chat-hour">
          08:55 <span className="fa fa-check-circle"></span>
        </div>
      </li>
    </>
  );
}
