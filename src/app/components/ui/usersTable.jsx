import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TableHeader from "../common/table/tableHeader.jsx";
import TableBody from "../common/table/tableBody.jsx";
import BookMark from "../common/bookmark";
import Qualities from "../ui/qualities";
import Table from "../common/table"; // можно вытащить ещё два компонента
import Profession from "./profession.jsx";

const UserTable = ({
  userCrop,
  handleDelete,
  handleToggleBookMark,
  selectedSort,
  onSort
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
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
    <Table>
      <TableHeader
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
      />
      <TableBody data={userCrop} columns={columns} />
    </Table>

    // <Table
    //   onSort={onSort}
    //   selectedSort={selectedSort}
    //   columns={columns}
    //   userCrop={userCrop}
    // />
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
