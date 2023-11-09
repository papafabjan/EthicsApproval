import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul className="navbar">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/usersdemo">UsersDemo</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar"> {/* Add the "sidebar" class to create a fixed sidebar */}
      <div className="nav-item">
        <div className="icon"> {/* You can replace this with an actual icon */}
          {/* Add your icon element or image here */}
        </div>
        <div className="text">Home</div>
      </div>
      <div className="nav-item">
        <div className="icon"> {/* You can replace this with an actual icon */}
          {/* Add your icon element or image here */}
        </div>
        <div className="text">Apply Here</div>
      </div>
      {/* Add more nav items as needed */}
    </div>

      <Outlet />
    </>
  )
};

export default Navbar;