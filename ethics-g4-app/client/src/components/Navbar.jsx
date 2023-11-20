import React from "react";
import { Link } from "react-router-dom";


import { UserContext } from "../components/UserContext";
import { useContext } from "react";
import { useEffect, useState } from "react";


function Navbar() {
  const user = useContext(UserContext);

  const logOut = async () => {
    try {
    const response = await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Logout successful');
      // Handle any further actions after successful logout
    } else {
      console.error('Logout failed');
      // Handle logout failure
    }
  } catch (error) {
    console.error('Error during logout', error);
    // Handle error during logout
  }

  window.location.reload(true);
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
