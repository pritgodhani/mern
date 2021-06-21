import React from "react";

function Post() {
  return (
    <>
      <div className="card " style={{ width: "300px" }}>
        <div className="modal-header">
          <img
            style={{ width: "40px" }}
            src={`http://localhost:5000/profileImg/16242490364192020-12-24-215744.jpg`}
            className="card-img-top"
            alt="profileimage"
          />
          <h6 className="modal-title">prit godhani</h6>
        </div>
        <img
          src={`http://localhost:5000/profileImg/16242490364192020-12-24-215744.jpg`}
          className="card-img-top"
          alt="postimage"
        />
        <div className="card-body">This is some text within a card body.</div>
      </div>
    </>
  );
}

export default Post;
