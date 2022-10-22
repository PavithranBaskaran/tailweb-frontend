import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let handleLogout = () => {
    navigate("/");
    // localStorage.removeItem("react_app_token");
    localStorage.clear()
  };
  let navUser = localStorage.getItem("username");
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row ">
          <div className="col  m-3 text-white fs-5 ">Students List</div>
          <div className="col d-flex justify-content-end align-items-center">
            <div className="text-white me-2">{navUser}</div>

            <button
              onClick={() => handleLogout()}
              className="btn btn-light text-dark"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
