import React from "react";
import PropTypes from "prop-types";

import User from "./user";

const UserTable = ({
  userCrop,
  handleDelete,
  handleToggleBookMark,
  currentSort,
  onSort
}) => {
  const handleSort = (item) => {
    if (currentSort.iterator === item) {
      onSort({
        ...currentSort,
        order: currentSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ iterator: item, order: "asc" });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>Имя</th>
          <th>Качества</th>
          <th onClick={() => handleSort("profession.name")}>Профессия</th>
          <th onClick={() => handleSort("completedMeetings")}>
            Встретился,раз
          </th>
          <th onClick={() => handleSort("rate")}>Оценка</th>
          <th onClick={() => handleSort("bookmark")}>Избранное</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userCrop.map((user) => (
          <User
            {...user}
            handleDelete={handleDelete}
            handleToggleBookMark={handleToggleBookMark}
            key={user._id}
          />
        ))}
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  userCrop: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleBookMark: PropTypes.func.isRequired,
  // handleSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UserTable;
