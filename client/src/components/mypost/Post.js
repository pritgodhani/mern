import React, { useState } from "react";

function Post(props) {
  const [dbData, setDbData] = useState(props.dataArry);

  var img = dbData.postImg;
  var title = dbData.postTitle;
  var peofileimg = localStorage.getItem("profileimg");
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
          <h6 className="modal-title">prit godhani</h6>
        </div>
        {console.log(img)}
        <img
          src={`http://localhost:5000/${img}`}
          className="card-img-top"
          alt="postimage"
        />
        <div className="card-body">{title}</div>
      </div>
    </>
  );
}

export default Post;
