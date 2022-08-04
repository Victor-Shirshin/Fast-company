import React from "react";
import PropTypes from "prop-types";

const DynamicLoading = ({ color, children }) => {
  return (
    <div className={`mb-3 p-3 border border-${color}`}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          className: "shadow p-3 m-3 border rounded"
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
