import React, { useState } from "react";
import ReceverText from "../ReceverText";
import SenderText from "../SenderText";

export default function ChatBox(props) {
  // console.log(" [ChatBox.js]props", props);
  const [inputText, setInputText] = useState("");
  // const [text, setText] = useState(null);
  var receverUsers = props.receverUsers;
  var loginUsers = props.loginUsers;
  const receverMessageObj = props.receverMessageObj;
  const [senderObj, setSenderObj] = useState({});
  // const [users, setusers] = useState({});
  const [showSendText, setShowSendText] = useState(false);
  // const [showRecevText, setShowRecevText] = useState(false);
  // console.log("[ChatBox.js]receverMessageObj", receverMessageObj);
  // console.log(" props.sendMessage", props);
  // console.log("receverUsers", receverUsers);
  // console.log("loginUsers", loginUsers);
  // let senderId = loginUsers._id;
  // console.log("senderId", senderId);

  // Socket.current.emit("sendMessage");
  // if (receverMessageObj) {
  //   setShowRecevText(true);
  // }
  // useEffect(() => {
  //   console.log("receverUsers", receverUsers);
  // }, []);
  async function handlerChange(e) {
    await setInputText(e.target.value);
    // console.log("change text", e.target.value);
  }

  async function handlerSubmit(e) {
    e.preventDefault();
    const sendObj = {
      senderId: loginUsers?._id,
      receverId: receverUsers?._id,
      Text: inputText,
    };
    // console.log("[ChatBox.js]sendMessage", props.sendMessage);
    // console.log("[ChatBox.js]sendObj", sendObj);
    await props.sendMessage(sendObj);
    setSenderObj(sendObj);
    setInputText("");
    setShowSendText(true);
    // console.log("click send", SenderText);
    // setText(inputText);
    // console.log("senderObj", sendObj);

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
          {/* {SenderText} */}
          {/* <ReceverText
            users={props.users}
            receverMessageObj={receverMessageObj}
          /> */}
          {props.receverMessageObj &&
            props.receverUsers._id === props.receverMessageObj.senderId && (
              <ReceverText
                users={props.users}
                receverMessageObj={receverMessageObj}
              />
            )}
          {showSendText && senderObj.receverId === props.receverUsers._id && (
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
                value={inputText}
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
