import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <NavLink
          className="nav-link active"
          exact
          to="/"
          activeStyle={{ fontWeight: "bold", color: "red" }}
        >
          Main
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/login"
          activeStyle={{ fontWeight: "bold", color: "red" }}
        >
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link"
          to="/users"
          activeStyle={{ fontWeight: "bold", color: "red" }}
        >
          Users
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
