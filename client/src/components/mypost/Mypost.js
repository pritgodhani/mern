import React, { useState } from "react";
import Post from "./Post";
import Axios from "axios";
function Mypost() {
  const [mypostimg, setMypostImg] = useState();
  const [posttitle, setPostTitle] = useState();
  const handlerImage = (e) => {
    // console.log(e.target.files[0]);
    setMypostImg(e.target.files[0]);
  };
  const handlerChange = (e) => {
    // console.log(e.target.value);
    setPostTitle(e.target.value);
  };
  const handlersubmitimg = async (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("mypostimg", mypostimg);
    formdata.append("mptitle", posttitle);
    var token = localStorage.getItem("token");
    // console.log("ckdmvlkndfvjk fdkvmd");

    const { data } = await Axios.post(
      "http://localhost:5000/mypost/",
      {
        authorization: "Bearer " + token,
      },
      (err, data) => {
        if (err) {
          console.log("err from mypost", err);
        }
        if (data) {
          console.log("mypost data", data);
        }
      }
    );
    // console.log(data);
    e.preventDefault();
  };
  return (
    <>
      {/* {console.log(proFilePath)} */}
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-body">
            <div className="container mb-3">
              <br />
              <h1>Add Post</h1>
              <form
                className="profile"
                onSubmit={(e) => {
                  handlersubmitimg(e);
                }}
              >
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput"
                    name="image"
                    placeholder="image"
                    onChange={(e) => {
                      handlerImage(e);
                    }}
                  />
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="titles"
                    onChange={(e) => {
                      handlerChange(e);
                    }}
                  />
                </div>
                <div className="form-floating mb-3">
                  <button type="submit" className="btn btn-primary">
                    submit
                  </button>
                </div>
              </form>
              <div className="container mb-3" style={{ width: "auto" }}>
                <h1>My Post</h1>
                <Post />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypost;
