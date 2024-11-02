import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ token }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(token);
  }, [token]);

  return (
    <div className="navbar bg-gray-800 text-white">
      <div className="flex-1">
        <NavLink className="btn btn-ghost text-2xl" to="/">
          Event Scheduler
        </NavLink>
      </div>
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li>
            <NavLink to="/">home</NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/events/add">add event</NavLink>
              </li>
            </>
          )}
  
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/logout">logout</NavLink>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/login">login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">sign up</NavLink>
              </li>
            </>
          )}
          </ul>
      </div>
    </div>
  );
};

export default Navbar;
