import React, { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const [image, setImage] = useState();
  useEffect(() => {
    var token = localStorage.getItem("token");
    var apiData = axios.post("http://localhost:5000/profile", { token: token });
    apiData.then(
      (value) => {
        var dbObj = value.data.data;

        var dbuserName = dbObj.userName;
        setName(dbuserName);
        var dbuserEmail = dbObj.email;
        setEmail(dbuserEmail);
        // var dbuserImage = dbObj.image;
        // setImage(dbuserImage);

        // console.log(value.data.data.userName);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handlerChange = (e) => {
    if (e.target.name === `name`) {
      setName(e.target.value);
    }
    if (e.target.name === `email`) {
      setEmail(e.target.value);
    }
  };
  const handlerImage = (e) => {
    // setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handlersubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    // console.log(e.target[2].value);
    var token = localStorage.getItem("token");
    // const data = new FormData();
    // data.append("image", e.target.files[0]);
    // data.append("username", e.target[1].value);
    // data.append("email", e.target[2].value);
    // var image = e.target[0].value;
    var username = e.target[1].value;
    var email = e.target[2].value;
    console.log(username);
    console.log(email);
    var updateDbData = axios.post("http://localhost:5000/profile/update", {
      name: username,
      email: email,
      token: token,
    });
    if (updateDbData.data) {
      alert("updated");
    }
    if (updateDbData.error) {
      alert("error");
    }
  };
  return (
    <>
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <img
            src="/server/public/profileImg/1623776637528Screenshot from 2020-11-11 20-15-46.png"
            className="card-img-top"
            alt="profile_image"
          />
          <div className="card-body">
            <div className="container mb-3">
              {/* <h1>sing up</h1> */}
              <br />
              <form
                className="profile"
                onSubmit={(e) => {
                  handlersubmit(e);
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
                    singup
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
