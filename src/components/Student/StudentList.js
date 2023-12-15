import React, { Component } from "react";
import Student from "./Student";

class StudentList extends Component {

  render() {
    
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Mã SV</th>
              <th className="name-col">Tên</th>
              <th className="date-col">Ngày sinh</th>
              <th className="gender-col">Giới tính</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map((objStudent, index) => (
              <Student key={index} student={objStudent} oder={index+1}/>
            ))}
          </tbody>
        </table>
        <div>
          <span>Số lượng: {this.props.list.length}</span>
        </div>
      </div>
    );
  }
}

export default StudentList;
