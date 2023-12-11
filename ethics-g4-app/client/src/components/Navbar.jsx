import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../components/UserContext";

function Navbar() {
  const user = useContext(UserContext);

  const Login = () => {
    const str = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
    window.open(str, "_self");
  };

  const Logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Logout successful");
        // Handle any further actions after successful Logout
      } else {
        console.error("Logout failed");
        // Handle Logout failure
      }
    } catch (error) {
      console.error("Error during Logout", error);
      // Handle error during Logout
    }

    window.location.reload(true);
  };

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
              name="searchSite"
            />
            <button className="btn" type="submit">
              <i className="fa-solid fa-search" />
            </button>
          </form>
          <span className="navbar-text">
            {user?.loggedIn === null ? (
              ""
            ) : user?.loggedIn === true ? (
              <>
                <Link to={`${import.meta.env.VITE_SERVER_URL}/account`}>
                  <img
                    className="rounded-circle shadow-4-strong"
                    src={user.img}
                    alt="User Profile Pic"
                    width="30vh"
                    margin-right="5px"
                    referrerPolicy="no-referrer"
                  />
                  Hi, {user.username}
                </Link>
                <i
                  onClick={Logout}
                  className="fa-solid fa-right-from-bracket"
                  style={{ cursor: "pointer" }}
                ></i>
              </>
            ) : (
              <>
                <div onClick={Login} style={{ cursor: "pointer" }}>
                  <i className="fa-solid fa-circle-user"></i>
                  {" Login"}
                </div>
              </>
            )}
          </span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
