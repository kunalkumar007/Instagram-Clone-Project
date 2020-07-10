import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="grey darken-4">
        <div className="nav-wrapper container">
          <NavLink to="/" className="brand-logo">
            Instagram
          </NavLink>
          <ul id="nav-mobile" className="right">
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">SignUp</NavLink>
            </li>
            <li>
              <NavLink to="/create-post">Create</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
