import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import AddStudent from "../Components/AddStudent";
import Navbar from "../Components/Navbar";
import Table from "../Components/Table";
import { config } from "../config";

function Dashboard() {
  let [students, setStudents] = useState([]);
  let [filterKey, setFilterKey] = useState("");
  let headings = ["Name", "Subject", "Marks"];

  let fetchData = async () => {
    try {
      let res = await axios.get(`${config.api}/api/student/dashboard/${localStorage.getItem('userid')}`,{ headers: {
        Authorization: `${localStorage.getItem("react_app_token")}`,
      },});
      setStudents(res.data);
      console.log(students)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let handleFilter = (e) => {
    setFilterKey(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container m-5">
          <button
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#addStudent"
          >
            Add Student
          </button>
          <input
            type="text"
            placeholder="Filter By Name & Subject"
            className="ms-4 rounded"
            onChange={(e) => handleFilter(e)}
          />
        </div>
        <Table headings={headings} students={students} setStudents={setStudents} filterKey={filterKey} />
      </div>
      <AddStudent id="addStudent" students={students} setStudents={setStudents}/>
      
    </>
  );
}

export default Dashboard;
