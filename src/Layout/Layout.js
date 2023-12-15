import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.scss";
import Message from "../components/Message";

class Layout extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Message />
          <Header />
          <Outlet />
          <Footer />
        </div>
      </>
    );
  }
}

export default Layout;
