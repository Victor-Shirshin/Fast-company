import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProps,
  contentProps,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          className={
            "list-group-item" + (items[item] === selectedItem ? " active" : "")
          }
          key={items[item][valueProps]}
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
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
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedItem: PropTypes.object,
  valueProps: PropTypes.string.isRequired,
  contentProps: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default GroupList;
