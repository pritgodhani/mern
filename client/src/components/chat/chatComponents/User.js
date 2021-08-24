import React from "react";
import "../chat.css";
export default function User(props) {
  const userData = props.user;
  const profileImg = userData.image;
  const userName = userData.userName;
  // console.log(userData);
  return (
    <div>
      <li className="person" data-chat="person1">
        <div className="user">
          <img src={`http://localhost:5000/${profileImg}`} alt="Retail Admin" />
          <span className="status busy"></span>
        </div>
        <p className="name-time">
          <span className="name">{userName}</span>
          {/* <span className="time">15/02/2019</span> */}
        </p>
      </li>
    </div>
  );
}
