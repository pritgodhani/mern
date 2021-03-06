import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  let token = localStorage.getItem("token");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <h4 className="text-body-50">
          <img src="logo192.png" alt="img" width="30" height="30" />
          Social media{" "}
        </h4>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="btn-group" role="group" aria-label="Basic example">
            {(() => {
              if (token) {
                return (
                  <div>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/AddPost">
                        AllPost
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/Chat">
                        Chat
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/MyPost">
                        MyPost
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/profile">
                        Profile
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/logout">
                        Logout
                      </Link>
                    </button>
                  </div>
                );
              } else {
                return <Link className="text-body" to="/"></Link>;
              }
            })()}
          </div>

          {/* <div className="">
            {(() => {
              if (token) {
                return (
                  <button type="button" className="btn btn-white">
                    <Link className="text-body" to="logout">
                      Logout
                    </Link>
                  </button>
                );
              } else {
                return (
                  <button type="button" className="btn btn-white">
                    <Link className="text-body" to="login">
                      Login
                    </Link>
                  </button>
                );
              }
            })()}
          </div> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
