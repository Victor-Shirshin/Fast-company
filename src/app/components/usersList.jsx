import React, { useState, useEffect } from "react";

import api from "../api";
import _ from "lodash";
import { paginate } from "../utils/paginate";

import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import DynamicLoading from "./DynamicLoading";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();

  const pageSize = 8; // сколько человек хотим отобразить на странице

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  // удаление элемента при 'клике' на button
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    // Условие добавил для устранения бага который не отображал пользователей если удалены все пользователи на последней странице у выбранной профессии.
    if (userCrop.length === 0 && currentPage > -1) {
      setCurrentPage((prevState) => prevState - 1);
    }
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <>
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus length={count} />
            {count !== 0 && (
              <UsersTable
                userCrop={userCrop}
                handleDelete={handleDelete}
                handleToggleBookMark={handleToggleBookMark}
                onSort={handleSort}
                selectedSort={sortBy}
              />
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count} // длинна массива кол-во юзеров
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <DynamicLoading>
        <h2>Loading...</h2>
      </DynamicLoading>
    </>
  );
};

export default UsersList;
