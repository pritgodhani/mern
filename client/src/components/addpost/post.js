import React, { useState } from "react";
function Post(props) {
  const [dbData, setDbData] = useState(props.dbMypost);
  console.log(dbData);
  // console.log(dbData.postImg);
  // console.log(dbData);
  var img = dbData.postImg;
  var title = dbData.postTitle;

  var peofileimg = dbData.userData.image;
  var username = dbData.userData.userName;

  return (
    <>
      <div className="card " style={{ width: "300px" }}>
        <div className="modal-header">
          <img
            style={{ width: "40px" }}
            src={`http://localhost:5000/${peofileimg}`}
            className="card-img-top"
            alt="profileimage"
          />
          <h6 className="modal-title">{username}</h6>
        </div>

        <img
          src={`http://localhost:5000/${img}`}
          className="card-img-top"
          alt="postimage"
        />
      </div>
    </>
  );
}

export default Post;
