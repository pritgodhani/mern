import React, { useState, useEffect } from "react";
import Axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import "./post.css";

function Post(props) {
  var token = localStorage.getItem("token");
  const dbData = props.dbMypost;
  // console.log("post data", dbData);
  // const [dbData, setDbData] = useState(props.dbMypost);
  const [likeBtn, setLikeBtn] = useState(false);
  var img = dbData.postImg;
  var title = dbData.postTitle;
  var postId = dbData._id;
  var peofileimg = dbData.userData.image;
  var username = dbData.userData.userName;
  useEffect(() => {
    getLikeBtnData();
  }, []);
  async function getLikeBtnData() {
    await Axios.get("http://localhost:5000/mypost/likePost", {
      headers: {
        Authorization: "Bearer " + token + " " + postId,
      },
    })
      .then((data) => {
        let likeUserId = data.data.likeUserId;
        var dbuserid = data.data.data.postLike.filter(function (item) {
          return (item.id = likeUserId);
        });
        console.log("likseUserData", dbuserid[0].like);
        setLikeBtn(dbuserid[0].like);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  var deletePost = (e) => {
    e.preventDefault();
    var postId = dbData._id;
    var deletePost = Axios.post("http://localhost:5000/mypost/delete", {
      id: postId,
    });
    deletePost
      .then((data) => {
        // console.log(data);
        alert(data.data.message);
        props.mypostdata();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const likeBtnClicked = () => {
    var likeValue = !likeBtn;
    console.log("cliked====>", likeValue);
    var likePost = Axios.post(
      "http://localhost:5000/mypost/likePost",
      {
        id: postId,
        like: likeValue,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    likePost
      .then((data) => {
        getLikeBtnData();
        alert(data.data.message);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <div className="card " style={{ width: "300px" }}>
        <div className="modal-header" style={{ justifyContent: "inherit" }}>
          <img
            style={{ width: "40px", height: "40px" }}
            src={`http://localhost:5000/${peofileimg}`}
            className="card-img-top rounded-circle mr-3 "
            alt="profileimage"
          />
          <h6 className="modal-title">{username}</h6>
          {props.delete === true ? (
            <div className="dropdown" style={{ marginLeft: "auto" }}>
              <button
                className="btn  dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="dropdown-item" onClick={(e) => deletePost(e)}>
                  Delete <DeleteIcon />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <img
          style={{ borderBlockColor: "20px" }}
          src={`http://localhost:5000/${img}`}
          className="card-img-top"
          alt="postimage"
        />
        <div className="card-body" style={{ margin: "-18px" }}>
          {title}
        </div>
        <div className="card-body" style={{ margin: "-18px" }}>
          <Button
            onClick={() => {
              likeBtnClicked();
            }}
          >
            {likeBtn === true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </div>
        <div className="card-body" style={{ margin: "-18px" }}>
          {title}
        </div>
      </div>
    </>
  );
}

export default Post;
