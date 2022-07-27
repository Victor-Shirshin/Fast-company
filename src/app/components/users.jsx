import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../api";

import User from "./user";
import Pagination from "./pagination";
import GroupList from "./groupList";

const Users = ({ users, handleDelete, handleToggleBookMark }) => {
  const count = users.length;
  const pageSize = 4; // сколько человек хотим отобразить на странице
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    console.log("render");
    // return () => {
    //   console.log("unmount");
    // };
  }, []);

  const handleProfessionSelect = (param) => {
    console.log(param);
  };

  const handlePageChange = (pageIndex) => {
    console.log("page ", pageIndex);
    setCurrentPage(pageIndex);
  };

  // разрезали кол-во человек на массив по 4 человека
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const userCrop = paginate(users, currentPage, pageSize); // (4)[{…}, {…}, {…}, {…}] по 4 человека

  return (
    <>
      {professions && (
        <GroupList
          items={professions}
          onItemSelect={handleProfessionSelect}
          valueProps="_id"
          contentProps="name"
        />
      )}
      {count !== 0 && (
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
      )}
      <Pagination
        itemsCount={count} // длинна массива кол-во юзеров
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};
Users.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  handleToggleBookMark: PropTypes.func.isRequired
};

export default Users;
