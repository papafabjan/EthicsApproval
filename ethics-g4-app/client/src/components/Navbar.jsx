import React from "react";
import { Link } from "react-router-dom";


import { UserContext } from "../components/UserContext";
import { useContext } from "react";
import { useEffect, useState } from "react";


function Navbar() {
  const user = useContext(UserContext);

  const logOut = () =>{
    window.localStorage.clear();
    window.location.reload();
  }

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
            
              {user?.loggedIn === null ? (
                ""
              ) : user?.loggedIn === true ? (
                <>
                <Link to="/loginpage">
                  <img
                    src={user.img}
                    alt="User Profile Pic"
                    width="30vh"
                    margin-right="5px"
                  />
                  Hi, {user.username}
                  </Link>
                  <i onClick={logOut} className="fa-solid fa-right-from-bracket"></i>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-circle-user"></i>
                  Login
                </>
              )}
            
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
