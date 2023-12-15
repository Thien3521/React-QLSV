import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Student(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirm = window.confirm('Xác nhận xoá?')
    if (!confirm) {
      return;
    }
    fetch(`https://657708f9197926adf62d2030.mockapi.io/api/v1/students/${id}`, {
      method: "DELETE",
    })
      .then((result) => {
        reloadData();
        navigate('/student',{state: {message: 'Đã xoá sinh viên thành công', isError: false}}  )
      })
      .catch((error) => {console.log(error);});
  };

  const reloadData = () => {
    fetch("https://657708f9197926adf62d2030.mockapi.io/api/v1/students")
      .then((result) => result.json())
      .then((result) => {
        dispatch({ type: "search", payload: { keyword: "", list: result } });
      })
      .catch((error) => {});
  };
  return (
    <tr>
      <td>{props.oder}</td>
      <td>{props.student.id}</td>
      <td>{props.student.name}</td>
      <td>{props.student.birthday}</td>
      <td>{props.student.gender}</td>
      <td>
        <NavLink to={`/student/${props.student.id}/edit`}>
          <button className="btn btn-primary">Sửa</button>
        </NavLink>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(props.student.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default Student;
