import React from "react";
import PropTypes from "prop-types";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
  userCrop,
  handleDelete,
  handleToggleBookMark,
  selectedSort,
  onSort
}) => {
  console.log("UserTable onSort", onSort);
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
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      userCrop={userCrop}
    >
      <TableHeader
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
      />
      <TableBody data={userCrop} columns={columns} />
    </Table>
    // <Table>
    //   <TableHeader
    //     onSort={onSort}
    //     selectedSort={selectedSort}
    //     columns={columns}
    //   />
    //   <TableBody data={userCrop} columns={columns} />
    // </Table>
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
