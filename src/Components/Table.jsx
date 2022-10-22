import axios from "axios";
import React, { useState } from "react";
import { config } from "../config";
import ViewStudent from "./ViewStudent";

function Table({ headings, students, setStudents, filterKey }) {
  let data = [];
  let [stuId, setStuId] = useState("");
  let handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${config.api}/api/student/${id}`,{ headers: {
        Authorization: `${localStorage.getItem("react_app_token")}`,
      },});
      alert(res.data.message);
      setStudents(res.data.students)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {headings.map((head) => {
              return (
                <>
                  <th>{head}</th>
                </>
              );
            })}

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length !== 0 ? (
            (data = students
              .filter((student) => {
                if (student.name === "" || student.subject === "") {
                  return student;
                } else if (
                  student.name
                    .toLowerCase()
                    .includes(filterKey.toLowerCase()) ||
                  student.subject
                    .toLowerCase()
                    .includes(filterKey.toLowerCase())
                ) {
                  return student;
                }
              })
              .map((student) => {
                return (
                  <>
                    <tr>
                      <td>{student.name}</td>
                      <td>{student.subject}</td>
                      <td>{student.mark}</td>
                      <td>
                        <button
                          className="btn btn-success me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#viewStudent"
                          onClick={() => setStuId(student._id)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              }))
          ) : (
            <tr>
              <td colSpan={"5"}>No Data</td>
            </tr>
          )}
          {data.length === 0 ? (
            <tr>
              <td colSpan={5}>No Records Found</td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <ViewStudent id="viewStudent" propId={stuId} setStudents={setStudents} />
    </>
  );
}

export default Table;
