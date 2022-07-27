import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import api from "../api";

import User from "./user";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users, handleDelete, handleToggleBookMark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4; // сколько человек хотим отобразить на странице

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // разрезали кол-во человек на массив по 4 человека
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const count = filteredUsers.length;

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <>
      <SearchStatus length={count} />
      {professions && (
        <>
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </>
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
