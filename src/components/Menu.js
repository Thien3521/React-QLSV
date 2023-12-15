import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <nav>
        <NavLink to="/student" className="btn btn-info">
          Students
        </NavLink>
        <NavLink to="/subject" className="btn btn-info">
          Subject
        </NavLink>
        <NavLink to="/register" className="btn btn-info">
          Register
        </NavLink>
      </nav>
    );
  }
}

export default Menu;
