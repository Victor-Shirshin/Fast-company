import React from "react";
import PropTypes from "prop-types";

// import User from "./user";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";

const UserTable = ({
  userCrop,
  handleDelete,
  handleToggleBookMark,
  selectedSort,
  onSort
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз"
    },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (userCrop) => (
        <BookMark
          status={userCrop.bookmark}
          onClick={() => handleToggleBookMark(userCrop._id)}
        />
      )
    },
    delete: {
      component: (userCrop) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(userCrop._id)}
        >
          delete
        </button>
      )
    }
  };

  return (
    <table className="table">
      <TableHeader
        selectedSort={selectedSort}
        onSort={onSort}
        columns={columns}
      />
      <TableBody data={userCrop} columns={columns} />
      {/* <tbody>
        {userCrop.map((user) => (
          <User
            {...user}
            handleDelete={handleDelete}
            handleToggleBookMark={handleToggleBookMark}
            key={user._id}
          />
        ))}
      </tbody> */}
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
