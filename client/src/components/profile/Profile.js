import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  // console.log("profile");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [proFilePath, setProFilePath] = useState();
  useEffect(() => {
    var token = localStorage.getItem("token");
    var apiData = axios.get("http://localhost:5000/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    apiData
      .then((value) => {
        // console.log(value);
        var dbObj = value.data.data;
        // console.log(dbObj);
        // console.log(imagePath);

        var dbuserName = dbObj.userName;
        setName(dbuserName);
        var dbuserEmail = dbObj.email;
        setEmail(dbuserEmail);
        var dbuserProImg = dbObj.image;
        setEmail(dbuserProImg);
      })
      .catch((err) => {
        console.log("get userdata error" + "</br>" + err);
      });
  }, []);
  const handlerChange = (e) => {
    if (e.target.name === `name`) {
      setName(e.target.value);
      console.log(e.target.value);
    }
    if (e.target.name === `email`) {
      console.log(e.target.value);
      setEmail(e.target.value);
    }
    if (e.target.name === `image`) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
    // console.log(e.target.files[0]);
  };
  const handlersubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    var token = localStorage.getItem("token");
    let username = e.target[1].value;
    let email = e.target[2].value;
    let proimage = e.target[0].value;
    console.log(e.target[0].value);
    console.log(proimage);
    console.log(username);
    console.log(email);
    formdata.append("name", username);
    formdata.append("email", email);
    formdata.append("image", proimage);
    axios
      .post("http://localhost:5000/profile/", formdata, {
        headers: {
          Authorization: "Bearer " + token,
        },
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
  // const handlerImage = (e) => {
  //   // console.log(e.target.files[0]);
  //   setImage(e.target.files[0]);
  // };
  // const handlersubmitimg = (e) => {
  //   e.preventDefault();
  //   // console.log(image);
  //   var token = localStorage.getItem("token");
  //   // console.log(image);
  //   const data = new FormData();
  //   data.append("image", image);

  //   var updateDbData = axios.post(
  //     "http://localhost:5000/profile/updateimg",
  //     data,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     }
  //   );
  //   updateDbData
  //     .then((value) => {
  //       // console.log(value.data.data);
  //       if (value.data.data) {
  //         alert(value.data.massege);
  //         window.location.reload();
  //       }
  //       // console.log(value);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <>
      {/* {console.log(proFilePath)} */}
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-body">
            <div className="container mb-3">
              <div style={{ width: "300px" }}>
                <img
                  src={`http://localhost:5000/${proFilePath}`}
                  className="img-thumbnail"
                  alt="profile_image "
                />
              </div>
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
                      handlerChange(e);
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
