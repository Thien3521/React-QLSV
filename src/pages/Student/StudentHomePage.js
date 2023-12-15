import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import StudentList from "../../components/Student/StudentList";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function StudentHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const list = useSelector(state => state.studentReducer.list);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://657708f9197926adf62d2030.mockapi.io/api/v1/students")
      .then((result) => result.json())
      .then((result) => {
          setIsLoaded(true);
          dispatch({ type: 'search', payload: { keyword: '', list: result } });
      })
      .catch((error) => {
          setError(error);
          // console.error('Fetch error:', error);
      });
  }, []);

  if (!isLoaded) {
    return <div className="text-success">Loading...</div>;
  } else if (error) {
    return <div className="text-danger">{error}</div>;
  }
  return (
    <div>
      <h1>Danh sách sinh viên</h1>
      <NavLink to="/student/create">
        <button className="btn btn-primary" id="btn-add">
          Thêm
        </button>
      </NavLink>
      <Search />
      <StudentList list={list} />
    </div>
  );
}

export default StudentHomePage;
