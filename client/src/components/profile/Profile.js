import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [proFilePath, setProFilePath] = useState();
  useEffect(() => {
    var token = localStorage.getItem("token");
    var apiData = axios.post("http://localhost:5000/profile", { token: token });
    apiData
      .then((value) => {
        // console.log(value);
        var dbObj = value.data.data;
        // console.log(dbObj.id);
        // console.log(imagePath);

        var dbuserName = dbObj.userName;
        setName(dbuserName);
        var dbuserEmail = dbObj.email;
        setEmail(dbuserEmail);
        var userid = dbObj._id;
        var imgPath = axios.post("http://localhost:5000/profile/imagepath", {
          id: userid,
        });
        // console.log(userid);
        imgPath
          .then((value) => {
            // console.log(value);

            // console.log(value.data.data.imagePath);
            setProFilePath(value.data.data.imagePath);
          })
          .catch((err) => {
            // console.log(err);
            console.log(err);
          });
        // setImagepath(imagePath);
        // console.log(imagepath);
        // console.log(value.data.data.userName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(imagepath);
  const handlerChange = (e) => {
    if (e.target.name === `name`) {
      setName(e.target.value);
    }
    if (e.target.name === `email`) {
      setEmail(e.target.value);
    }
  };
  const handlersubmit = (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    var username = e.target[0].value;
    var email = e.target[1].value;
    axios
      .post("http://localhost:5000/profile/updateEmailAndUsername", {
        token: token,
        name: username,
        email: email,
      })
      .then(function (response) {
        // console.log(response.data.data);
        if (response.data.error) {
          alert(response.data.error.message);
        }
        if (response.data.data) {
          alert("update succesfuly");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error.massege);
      });
  };
  const handlerImage = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handlersubmitimg = (e) => {
    e.preventDefault();
    // console.log(image);
    var token = localStorage.getItem("token");
    // console.log(image);
    const data = new FormData();
    data.append("image", image);
    data.append("token", token);

    var updateDbData = axios.post(
      "http://localhost:5000/profile/updateimg",
      data
    );
    updateDbData
      .then((value) => {
        // console.log(value.data.data);
        if (value.data.data) {
          alert(value.data.massege);
        }
        // console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* {console.log(proFilePath)} */}
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <div style={{ width: "300px" }}>
            <img
              src={`http://localhost:5000/${proFilePath}`}
              className="img-thumbnail"
              alt="profile_image "
            />
          </div>
          <div className="card-body">
            <div className="container mb-3">
              {/* <h1>sing up</h1> */}
              <br />
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
                  <button type="submit" className="btn btn-primary">
                    update
                  </button>
                </div>
              </form>
              <form
                className="profile"
                onSubmit={(e) => {
                  handlersubmit(e);
                }}
              >
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      handlerChange(e);
                    }}
                  />
                </div>
                <div className=" form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    name="email"
                    value={email}
                    placeholder="Email address"
                    onChange={(e) => {
                      handlerChange(e);
                    }}
                  />
                </div>

                <div className="form-floating mb-3">
                  <button type="submit" className="btn btn-primary">
                    update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
