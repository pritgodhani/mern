import React, { useState } from "react";
import ReceverText from "../ReceverText";
import SenderText from "../SenderText";

export default function ChatBox(props) {
  const [inputText, setInputText] = useState(null);
  // const [text, setText] = useState(null);
  var receverUsers = props.receverUsers;
  var loginUsers = props.loginUsers;
  const [senderObj, setSenderObj] = useState({});
  const [showSendText, setShowSendText] = useState(false);
  // console.log(" props.sendMessage", props);
  // console.log("receverUsers", receverUsers);
  // console.log("loginUsers", loginUsers);
  // let senderId = loginUsers._id;
  // console.log("senderId", senderId);

  // Socket.current.emit("sendMessage");
  function handlerChange(e) {
    setInputText(e.target.value);
    console.log("change text", e.target.value);
  }
  function handlerSubmit(e) {
    e.preventDefault();
    const sendObj = {
      senderId: loginUsers?._id,
      receverId: receverUsers?._id,
      Text: inputText,
    };
    props.sendMessage(senderObj);
    setSenderObj(sendObj);
    setShowSendText(true);

    // console.log("click send", SenderText);
    // setText(inputText);
    // console.log("senderObj", senderObj);

    // return SenderText;
  }
  return (
    <div>
      <div className="selected-user">
        {receverUsers ? (
          <span>
            To:
            <span className="name">{receverUsers?.userName}</span>
          </span>
        ) : null}
      </div>
      <div className="chat-container">
        <ul className="chat-box chatContainerScroll">
          <ReceverText />
          {SenderText}
          {showSendText && (
            <SenderText SenderText={senderObj} senderData={loginUsers} />
          )}
          {/* {console.log("render sendTest", SenderText)} */}
        </ul>
        <div className="form-group mt-3 mb-0">
          <form
            onSubmit={(e) => {
              handlerSubmit(e);
            }}
          >
            <div className="input-group">
              {" "}
              <input
                type="text"
                name="message"
                placeholder="Type Message ..."
                className="form-control"
                onChange={(e) => handlerChange(e)}
              />{" "}
              <span className="input-group-btn">
                {" "}
                <button type="submit" className="btn btn-info">
                  Send
                </button>{" "}
              </span>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
