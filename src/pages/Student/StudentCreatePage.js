import React from "react";
import "./StudentCreatePage.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentCreatePage() {
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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
    setMessage('Đang xử lý ...')
    // alert(JSON.stringify(values, null, 2));
    // Call API
    fetch("https://657708f9197926adf62d2030.mockapi.io/api/v1/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        navigate('/student', {state: {message: 'Sinh viên được thêm thành công', isError: false}} )
      })
      .catch((error) => {
        setMessage("Có lỗi xảy ra, vui lòng thử lại!");
        setIsError(true);
      });
  };

  return (
    <div>
      <div className="container">
        <h1>Thêm Sinh Viên</h1>
        <form className="student-form" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Tên</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            // required
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

          <button type="submit">Thêm</button>
        </form>
      </div>
    </div>
  );
}

export default StudentCreatePage;
