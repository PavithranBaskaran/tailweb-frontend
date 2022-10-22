import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { config } from "../config";

function ViewStudent({ propId ,setStudents }) {
  let [stu, setStudent] = useState([]);

  let handleView = async () => {
    let res = await axios.get(`${config.api}/api/student/${propId}`,{ headers: {
      Authorization: `${localStorage.getItem("react_app_token")}`,
    },});
    // console.log(res.data);
    setStudent(res.data)
    formik.setValues(res.data);
  };
  useEffect(() => {
    if (propId) handleView();
    makeDisabled(true);
  }, [propId]);

  let formik = useFormik({
    initialValues: {
      name: "",
      mark: "",
      subject: "",
    },
    onSubmit: async (values) => {
      try {
        let res = await axios.put(
          `${config.api}/api/student/${propId}`,
          values,{headers: {
            Authorization: `${localStorage.getItem("react_app_token")}`,
          }}
        );
        formik.setValues(res.data.student);
        handleView();
        alert(res.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  });
  function makeDisabled(type) {
    let ele = document.querySelectorAll(".input");
    for (let i = 0; i < ele.length; i++) {
      ele[i].disabled = type;
    }
  }

  return (
    <>
      <div className="modal modal-lg" id="viewStudent">
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
                  <span>Name:</span>
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    disabled
                  />
                  <span>Subject:</span>
                  <input
                    className="input"
                    type="text"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    disabled
                  />
                  <span>Mark:</span>
                  <input
                    className="input"
                    type="text"
                    name="mark"
                    value={formik.values.mark}
                    onChange={formik.handleChange}
                    disabled
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    makeDisabled(false);
                  }}
                >
                  Edit
                </button>

                <button type="submit" className="btn btn-success">
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

export default ViewStudent;
