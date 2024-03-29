import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
// import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

// Условие при котором предоставляем пользователю защищённый путь такое же как в NavBar.jsx через currentUser. Изменили логику через isLoggedIn
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  // const { currentUser } = useAuth();
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ProtectedRoute;
