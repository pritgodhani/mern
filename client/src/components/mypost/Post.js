import React, { useState } from "react";
import Axios from "axios";
function Post(props) {
  const [dbData, setDbData] = useState(props.dataArry);

  var img = dbData.postImg;
  var title = dbData.postTitle;

  var peofileimg = props.pImg;
  var username = props.uName;
  var deletePost = (e) => {
    e.preventDefault();
    var postId = dbData._id;
    // console.log(e);
    // console.log(postId);
    var deletePost = Axios.post("http://localhost:5000/mypost/delete", {
      id: postId,
    });
    deletePost
      .then((data) => {
        console.log(data);
        alert(data.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        <div className="card-body">
          <div>{title}</div>
          <button
            type="button"
            class="btn-sm  btn-secondary"
            onClick={(e) => deletePost(e)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Post;
