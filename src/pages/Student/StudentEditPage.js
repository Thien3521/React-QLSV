import React, { useEffect } from "react";
import "./StudentCreatePage.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function StudentEditPage() {
  let navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên"),
      birthday: Yup.string().required("Vui lòng nhập ngày sinh"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
    }),
    onSubmit: (values) => handleSubmitForm(values),
  });

  const handleSubmitForm = (data) => {
    setMessage("Đang xử lý ...");
    fetch(
      `https://657708f9197926adf62d2030.mockapi.io/api/v1/students/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((result) => {
        navigate("/student", {
          state: {
            message: "Sinh viên đã được sửa thành công",
            isError: false,
          },
        });
      })
      .catch((error) => {
        setMessage(error);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetch(
      `https://657708f9197926adf62d2030.mockapi.io/api/v1/students/${params.id}`
    )
      .then((result) => result.json())
      .then((result) => {
        setIsError(false);
        formik.values.name = result.name;
        formik.values.birthday = result.birthday;
        formik.values.gender = result.gender;
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!isLoaded) {
    return <div className="text-success">Loading...</div>;
  } else if (isError) {
    return <div className="text-danger">{message}</div>;
  }

  return (
    <div>
      <div className="container">
        <h1>Chỉnh sửa Sinh Viên</h1>
        <form className="student-form" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Tên</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <label className="error">{formik.errors.name}</label>
          )}

          <label htmlFor="birthday">Ngày Sinh</label>
          <input
            type="date"
            className="form-control"
            name="birthday"
            id="birthday"
            onChange={formik.handleChange}
            value={formik.values.birthday}
          />
          {formik.errors.birthday && formik.touched.birthday && (
            <label className="error">{formik.errors.birthday}</label>
          )}

          <label htmlFor="gender">Giới Tính</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option value="">---</option>
            <option value="nam">Nam</option>
            <option value="nữ">Nữ</option>
            <option value="khác">Khác</option>
          </select>
          {formik.errors.gender && formik.touched.gender && (
            <label className="error">{formik.errors.gender}</label>
          )}

          <button type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
}

export default StudentEditPage;
