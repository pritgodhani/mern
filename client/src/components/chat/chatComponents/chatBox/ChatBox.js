import axios from "axios";
import React, { useEffect, useState } from "react";
import ReceverText from "../ReceverText";
import SenderText from "../SenderText";

export default function ChatBox(props) {
  const token = localStorage.getItem("token");

  console.log(" [ChatBox.js]props ===========> ", props);
  const [inputText, setInputText] = useState("");
  const [receverMessageObj, setReceverMessageObj] = useState([]);
  // const [text, setText] = useState(null);
  var receverUsers = props.receverUsers;
  var loginUsers = props.loginUsers;
  
  // const [senderObj, setSenderObj] = useState(null);
  const [sendArray, setSendArray] = useState([]);
  const [texts, setText] = useState({});
  // const [showSendText, setShowSendText] = useState(false);
    // const sendArray = []
    useEffect(()=>{
      var  receverMessageObj = props.receverMessageObj;
      setReceverMessageObj(receverMessageObj)
    },[props.receverMessageObj])
  const sendMesagesocatIO = sendArray.map((text, index) => {
    if (loginUsers?._id === text.senderId && receverUsers?._id === text.receverId) {
      return <SenderText key={index} SenderText={text} senderData={loginUsers} />
      // return console.log('text',text)
    } })
  const recevMesagesocatIO = receverMessageObj.map((text, index) => {
    if (loginUsers?._id === text.receverId && receverUsers?._id === text.senderId) {
      return <ReceverText
        key={index}
        users={props.users}
        receverMessageObj={text}
      />
      // return console.log('text',text)
    } })
  console.log('sendArray',sendArray)
  console.log('sendMesagesocatIO',sendMesagesocatIO)
  console.log('[ChatBox.js]receverMessageObj',receverMessageObj)
  console.log('recevMesagesocatIO',recevMesagesocatIO)
  // const [showRecevText, setShowRecevText] = useState(false);
  // console.log("[ChatBox.js]receverMessageObj", receverMessageObj);
  // console.log(" props.sendMessage", props);
  // console.log("receverUsers", receverUsers);
  // console.log("loginUsers", props.loginUsers);
  // let senderId = loginUsers._id;
  // console.log("senderId", senderId);
  // Socket.current.emit("sendMessage");
  // if (receverMessageObj) {
  //   setShowRecevText(true);
  // }
  // useEffect(() => {
  //   console.log("receverUsers", receverUsers);
  // }, []);
  // console.log('receverUsers', receverUsers?._id);
  // console.log('loginUsers', loginUsers?._id);
  useEffect(() => {
    messageObjsGET()

  }, [receverUsers?._id]);
  const messageObjsGET = () => {
    var messagedataGet = axios.get("http://localhost:5000/allUser/message ", {
      headers: {
        Authorization:
          "Bearer " + token + " " + loginUsers?._id + " " + receverUsers?._id,
      },
    });

    messagedataGet
      .then((data) => {
        // console.log("GET_MESSAGE_CHAT_BOX", data.data.data);
        setText(data.data.data);
      })
      .catch((err) => {
        console.log("[chatBox.js]", err);
      });
  }
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
    sendArray.push(sendObj)
    setSendArray(sendArray)
    // console.log("[ChatBox.js]sendMessage", props.sendMessage);
    // console.log("[ChatBox.js]sendObj", sendObj);
    await props.sendMessage(sendObj);
    // setSenderObj(sendObj);
    setInputText("");
    // setShowSendText(true);

  }

  // console.log("setStete", texts);
  // for (const i of texts) {
  //   console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
  // }
  try {

    var textObj = texts?.map((text, index) => {
      if (loginUsers?._id === text.senderId && receverUsers?._id === text.receverId) {
        return <SenderText key={index} SenderText={text} senderData={loginUsers} />
        // return console.log('text',text)
      }
      if (loginUsers?._id === text.receverId && receverUsers?._id === text.senderId) {
        return <ReceverText
          key={index}
          users={props.users}
          receverMessageObj={text}
        />
        // return console.log('text',text)
      }
    });
    // console.log(textObj);
  } catch (error) {
    console.log(error)
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
          {textObj}
          {sendMesagesocatIO}
          {recevMesagesocatIO}
          {/* {props.receverMessageObj &&
            props.receverUsers._id === props.receverMessageObj.senderId && (
              <ReceverText
                users={props.users}
                receverMessageObj={receverMessageObj}
              />
            )} */}
          {/* {sendArray.length !== 0 && senderObj.receverId === props.receverUsers._id && (
            <SenderText SenderText={senderObj} senderData={loginUsers} />
          )} */}
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
