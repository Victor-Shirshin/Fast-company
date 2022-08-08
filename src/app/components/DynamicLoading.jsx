import React from "react";
import PropTypes from "prop-types";

const DynamicLoading = ({ children }) => {
  return (
    <div className={`mb-3 p-3`}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...child.props,
          className: "shadow p-3 m-3"
        });
      })}
    </div>
  );
};

DynamicLoading.propTypes = {
  color: PropTypes.string,
  children: PropTypes.object
};

export default DynamicLoading;
