//react-pro-sidebar could be used in a later state to complete the sidebar design unless we can make the components appropriatly with styled components
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import React, { useContext } from "react";
import styled from "styled-components";
import { cityTheme } from "../themes";

const Sidebar = () => {
  const user = useContext(UserContext);
  const loggedIn = user && user.loggedIn;
  const isAdmin = user && user.role === "admin";
  const showDashboard =
    user && (user.role === "admin" || user.role === "staff");

  return (
    <>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img
              src="../assets/images/logo_city_black.png"
              height="120em"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="icon-titles-container">
          {isAdmin && (
            <div className="icon-title">
              <Link to="/admindashboard">
                <i className="fa-solid fa-user"></i>
                Admin Dashboard
              </Link>
            </div>
          )}
          <div className="icon-title">
            <Link to="/application">
              <i className="fa-solid fa-file-pen" aria-hidden="true"></i>
              Application
            </Link>
          </div>

          <div className="icon-title">
            <Link to="/contact">
              <i className="fa-solid fa-envelope"></i>Contact
            </Link>
          </div>

          <div className="icon-title">
            <Link to="/guides">
              <i className="fa fa-book" aria-hidden="true"></i>Guides
            </Link>
          </div>

          <div className="icon-title">
            <Link to="/document_templates">
              <i className="fa fa-file" aria-hidden="true"></i>Document
              templates
            </Link>
          </div>

          {showDashboard && (
            <div className="icon-title">
              <Link to="/dashboard">
                <i className="fa fa-table-columns" aria-hidden="true"></i>
                Dashboard
              </Link>
            </div>
          )}

          {loggedIn && (
            <div className="icon-title">
              <Link to="/myapplications">
                <i className="fa fa-pen-to-square" aria-hidden="true"></i>My
                Applications
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
