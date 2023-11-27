//react-pro-sidebar could be used in a later state to complete the sidebar design unless we can make the components appropriatly with styled components
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import React, { useContext } from "react";

const Sidebar = () => {
  const user  = useContext(UserContext);
  const isAdmin = user && user.role === 'admin';

  return (
    <>
      <div>
        <Link to="/">
          <img src="../assets/images/logo-city.png" height="100em" alt="Logo" />
        </Link>
      </div>

      {isAdmin && (
        <div className="nav-item">
          <div className="text">
            <Link to="/admindashboard">
              <i className="fa-solid fa-user"></i>AdminDashboard
            </Link>
          </div>
        </div>
      )}

      <div className="nav-item">
        <div className="text">
          <Link to="/application">
            <i className="fa-solid fa-file-pen" aria-hidden="true"></i>
            Application
          </Link>
        </div>
      </div>

      <div className="nav-item">
        <div className="text">
          <Link to="/contact">
            <i className="fa-solid fa-envelope"></i>Contact
          </Link>
        </div>
      </div>

      <div className="nav-item">
        <div className="text">
          <Link to="/guides">
            <i className="fa fa-book" aria-hidden="true"></i>Guides
          </Link>
        </div>
      </div>

      <div className="nav-item">
        <div className="text">
          <Link to="/document_templates">
            <i className="fa fa-file" aria-hidden="true"></i>Document templates
          </Link>
        </div>
      </div>
      <div className="nav-item">
        <div className="text">
          <Link to="/dashboard">
            <i className="fa fa-table-columns" aria-hidden="true"></i>Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
