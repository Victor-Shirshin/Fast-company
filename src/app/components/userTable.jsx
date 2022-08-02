import React from "react";
import PropTypes from "prop-types";

import User from "./user";
import TableHeader from "./tableHeader";

const UserTable = ({
  userCrop,
  handleDelete,
  handleToggleBookMark,
  selectedSort,
  onSort
}) => {
  const columns = {
    name: { iterator: "name", name: "Имя" },
    qualities: { name: "Качества" },
    professions: { iterator: "profession.name", name: "Профессия" },
    completedMeetings: {
      iterator: "completedMeetings",
      name: "Встретился, раз"
    },
    rate: { iterator: "rate", name: "Оценка" },
    bookmark: { iterator: "bookmark", name: "Избранное" },
    delete: {}
  };

  return (
    <table className="table">
      <TableHeader
        selectedSort={selectedSort}
        onSort={onSort}
        columns={columns}
      />
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
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UserTable;
