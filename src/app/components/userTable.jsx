import React from "react";
import PropTypes from "prop-types";

import User from "./user";

const UserTable = ({
  userCrop,
  handleDelete,
  handleToggleBookMark,
  onSort
}) => {
  console.log(userCrop);
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("name")}>Имя</th>
          <th>Качества</th>
          <th onClick={() => onSort("profession.name")}>Профессия</th>
          <th onClick={() => onSort("completedMeetings")}>Встретился,раз</th>
          <th onClick={() => onSort("rate")}>Оценка</th>
          <th onClick={() => onSort("bookmark")}>Избранное</th>
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
  onSort: PropTypes.func.isRequired
};

export default UserTable;
