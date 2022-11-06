import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";

// import { useAuth } from "../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
  // const { currentUser } = useAuth();
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
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
          {isLoggedIn && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/users"
                activeStyle={{ fontWeight: "bold", color: "red" }}
              >
                Users
              </NavLink>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <NavLink
              className="nav-link"
              to="/login"
              activeStyle={{ fontWeight: "bold", color: "red" }}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
