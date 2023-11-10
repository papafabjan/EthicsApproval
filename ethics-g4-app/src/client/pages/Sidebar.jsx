//react-pro-sidebar will be used in a later state to complete the sidebar design
import { Link } from "react-router-dom";
import 'boxicons';

const Sidebar = () => {
  return (
    <>
       <div className="sidebar">
        
          <div>
            <Link to="/">
              <img src="/assets/images/logo-city.png" height="100em" alt="Logo" />
            </Link>
          </div>

        <div className="nav-item">
          <div className="text">
            <Link to="/usersdemo">
             <box-icon name='user'></box-icon>UsersDemo
            </Link>
          </div>
        </div>

        <div className="nav-item">
          <div className="text">
            <Link to="/contact">
              <box-icon name='envelope'></box-icon>Contact
            </Link>
          </div>
        </div>
      </div>

      
    </>
  )
};

export default Sidebar;