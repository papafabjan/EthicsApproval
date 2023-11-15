import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn" type="submit">
              Search
            </button>
          </form>
          <span className="navbar-text">
            <Link to="/loginpage">
              <i className="fa-solid fa-circle-user"></i>Login
            </Link>
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
