import React, { useState, useEffect } from "react";
import Post from "./Post";
import Axios from "axios";
function Mypost() {
  const [mypostimg, setMypostImg] = useState();
  const [posttitle, setPostTitle] = useState();
  const [dbmyposts, setDbMyPost] = useState([]);
  useEffect(() => {
    var token = localStorage.getItem("token");
    var getmypost = Axios.get("http://localhost:5000/mypost/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    getmypost
      .then((data) => {
        console.log("mypost 2 ");
        setDbMyPost(data.data.data);
        // console.log(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    var getmypost = Axios.get("http://localhost:5000/mypost/username", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    getmypost
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    formdata.append("image", mypostimg);
    formdata.append("mptitle", posttitle);
    var token = localStorage.getItem("token");
    // console.log("ckdmvlkndfvjk fdkvmd");

    const mypost = Axios.post("http://localhost:5000/mypost/", formdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    mypost
      .then((data) => {
        if (data) {
          alert(data.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err) {
          console.log("err from mypost", err);
          // alert(data.data.message);
        }
      });
    // console.log(.ldata);
  };

  const postIten = dbmyposts.map((dbmypost) => <Post dataArry={dbmypost} />);
  return (
    <>
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
                <div>
                  {/* {console.log("ddd", postIten)} */}
                  {postIten}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypost;
