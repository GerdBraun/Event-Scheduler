import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink className="btn btn-ghost text-xl" to="/">Event Scheduler</NavLink>
          </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">home</NavLink>
            </li>
            <li>
              <NavLink to="/events/add">add event (protected)</NavLink>
            </li>
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">sign up (hidden when logged in)</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  