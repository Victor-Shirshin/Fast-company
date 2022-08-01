import React from "react";
import PropTypes from "prop-types";

import User from "./user";

const UserTable = ({ userCrop, handleDelete, handleToggleBookMark }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Качества</th>
          <th>Профессия</th>
          <th>Встретился,раз</th>
          <th>Оценка</th>
          <th>Избранное</th>
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
  handleToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;
