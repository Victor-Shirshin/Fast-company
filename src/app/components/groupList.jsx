import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProps, contentProps, onItemSelect }) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li className="list-group-item" key={items[item][valueProps]}>
          {items[item][contentProps]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProps: "_id",
  contentProps: "name"
};

GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  valueProps: PropTypes.string.isRequired,
  contentProps: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default GroupList;
