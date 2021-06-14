import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: null,
    };
  }

  async handlerChange(e) {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  async handlerSubmit(e) {
    e.preventDefault();
    if (!this.state.email) {
      alert("email is require");
    } else if (!this.state.password) {
      alert("password is require");
    } else {
      const { data } = await axios.post("http://localhost:5000/login", {
        email: this.state.email,
        password: this.state.password,
      });
      if (data.error) {
        alert(data.error);
      }
      if (data.Messege) {
        alert(data.Messege);
        localStorage.setItem("token", data.Token);
        window.location.reload();
        if (localStorage.getItem("token")) {
          this.setState({ redirect: "./AddPost" });
        }

        // window.location.href = "/addpost";
      }
      // console.log(data);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <>
        <div className="container mb-3">
          <br />
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              this.handlerSubmit(e);
            }}
          >
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="email"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="password"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div>
              <p className="text-justify">
                Don't have an account?
                <Link to="/regster">singup</Link>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
}
