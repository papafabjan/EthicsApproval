import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../components/UserContext";

const Navbar = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

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
        // Redirect to the main page after successful Logout
      } else {
        console.error("Logout failed");
        // Handle Logout failure
      }
      navigate("/");
      window.location.reload(true);
    } catch (error) {
      console.error("Error during Logout", error);
      // Handle error during Logout
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <form className="d-flex" role="search">
          
          </form>
            {user?.admin_of_department && (
              <p style={{ color: "black" }}>Department code: {user.admin_of_department}</p>
            )}
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
};

export default Navbar;
