//react-pro-sidebar could be used in a later state to complete the sidebar design unless we can make the components appropriatly with styled components
import { Link } from "react-router-dom";




const Sidebar = () => {
  return (
    <>
        <div>
          <Link to="/">
            <img src="/assets/images/logo-city.png" height="100em" alt="Logo" />
          </Link>
        </div>

        <div className="nav-item">
          <div className="text">
            <Link to="/usersdemo">
              <i className="fa-solid fa-user"></i>UsersDemo
            </Link>
          </div>
        </div>

        <div className="nav-item">
          <div className="text">
            <Link to="/loginpage">
              <i className="fa-solid fa-right-to-bracket"></i>Login
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
    </>
  );
};

export default Sidebar;
