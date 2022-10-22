import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";

function Register() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${config.api}/api/auth/register`, values);
        alert(res.data.message);

        if (res.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <h2 className="text-center mt-5">Student List</h2>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://img.freepik.com/free-photo/young-attractive-smiling-student-showing-thumb-up-outdoors-campus-university_8353-6394.jpg?w=2000"
              className="img-fluid"
              alt="image"
              style={{ minHeight: "100%" }}
            />
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Register Form</h3>
            <div className="form-style">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="pb-2">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="pt-4 text-center">
                Already have account. <Link to={"/"}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
