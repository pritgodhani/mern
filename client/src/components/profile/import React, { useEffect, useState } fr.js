import React, { useEffect, useState } from "react";
import axios from "axios";
import profile from "../../../../server/models/profile";

function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [imagepath, setImagepath] = useState();
  const [proFilePath, setProFilePath] = useState();
  useEffect(() => {
    var token = localStorage.getItem("token");
    var apiData = axios.post("http://localhost:5000/profile", { token: token });
    apiData
      .then((value) => {
        // console.log(value);
        var dbObj = value.data.data;
        // console.log(dbObj.id);

        var dbuserName = dbObj.userName;
        setName(dbuserName);
        var dbuserEmail = dbObj.email;
        setEmail(dbuserEmail);
        var imagePath = dbObj.id;
        setImagepath(imagePath);

        // console.log(value.data.data.userName);
      })
      .catch((err) => {
        console.log(err);
      });
    var emgId = imagepath;
    var imagePath = axios.post("http://localhost:5000/profile/imagepath", {
      id: emgId,
    });
    imagePath
      .then((value) => {
        setProFilePath(value.data.data[0].imagePath);
        console.log(value.data.data[0].imagePath);
      })
      .catch((err) => {
        // console.log(err);
        console.log(err);
      });
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
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handlersubmit = (e) => {
    e.preventDefault();

    var token = localStorage.getItem("token");
    // console.log(image);
    const data = new FormData();
    data.append("image", image);
    data.append("name", e.target[1].value);
    data.append("email", e.target[2].value);
    data.append("token", token);

    var updateDbData = axios.post("http://localhost:5000/profile/update", data);
    updateDbData
      .then((value) => {
        // console.log(value.data);
        alert(value.data.massege);
        // console.log(value);
      })
      .catch((err) => {
        // console.log(err);
        console.log(err);
      });
  };
  return (
    <>
      <div className="container">
        {console.log("123123", proFilePath)}
        <div className="card" style={{ width: "auto" }}>
          {/* <img
            src={`http://localhost:5000/${proFilePath}`}
            className="card-img-top"
            alt="profile_image"
          /> */}
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
