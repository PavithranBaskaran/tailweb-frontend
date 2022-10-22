import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { config } from "../config";

function AddStudent({ students, setStudents }) {
  // let [students, setStudents] = useState([]);
  let fetchData = async () => {
    try {
      let res = await axios.get(`${config.api}/api/student/dashboard`, {
        headers: {
          Authorization: `${localStorage.getItem("react_app_token")}`,
        },
      });
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  let formik = useFormik({
    initialValues: {
      name: "",
      subject: "",
      mark: "",
    },
    onSubmit: async (values) => {
      try {
        let res = await axios.post(
          `${config.api}/api/student/add-student`,
          values,
          {
            headers: {
              Authorization: `${localStorage.getItem("react_app_token")}`,
            },
          }
        );
        alert(res.data.message);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    },
  });
  // if (student) {
  //   formik.setValues(student);
  // }
  return (
    <>
      <div className="modal modal-lg" id="addStudent">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Student</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body ">
                <div className="container d-flex flex-column">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="mb-3 rounded"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="mb-3 rounded"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                  />
                  <input
                    type="text"
                    name="mark"
                    placeholder="Mark"
                    className="mb-3 rounded"
                    value={formik.values.mark}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-dark" type="submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStudent;
