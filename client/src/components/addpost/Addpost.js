import React, { useState, useEffect } from "react";
import Axios from "axios";
import Post from "../mypost/Post";
function Addpost() {
  var [allPosts, setAllPost] = useState([]);
  const [userName, setUserName] = useState();
  const [proImg, setProImg] = useState();
  useEffect(() => {
    uNmaeAndProfile();
    var token = localStorage.getItem("token");
    var getAllPost = Axios.get("http://localhost:5000/allpost/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    getAllPost
      .then((data) => {
        // console.log(data.data.data);
        setAllPost(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function uNmaeAndProfile() {
    var token = localStorage.getItem("token");
    var apiData = Axios.get("http://localhost:5000/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    apiData
      .then((value) => {
        var dbObj = value.data.data;

        var dbuserName = dbObj.userName;
        setUserName(dbuserName);
        var userid = dbObj._id;
        var imgPath = Axios.post("http://localhost:5000/profile/imagepath", {
          id: userid,
        });
        imgPath
          .then((value) => {
            setProImg(value.data.data.imagePath);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const allItem = allPosts.map((allPost) => (
    <Post dataArry={allPost} uName={userName} pImg={proImg} />
  ));
  return (
    <>
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-body">
            <div className="container mb-3">
              <div className="container mb-3" style={{ width: "auto" }}>
                <h1>all Post</h1>
                <div>{allItem}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addpost;
