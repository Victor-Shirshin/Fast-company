import React, { useState, useEffect } from "react";
import _ from "lodash";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import SearchPanel from "../../searchPanel";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUsers";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 8;
  const { users } = useUser();
  const { isLoading: professionsLoading, professions } = useProfessions();
  const { currentUser } = useAuth();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  // удаление пользователя при 'клике'
  const handleDelete = (userId) => {
    // setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    console.log(userId);
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    // setUsers(newArray);
    console.log(newArray);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    // Избежать лишнего вызова setSearchQuery()
    if (searchQuery !== "") {
      setSearchQuery("");
    }
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
    // Избежать лишнего вызова setSelectedProf()
    if (searchQuery.length < 1) {
      setSelectedProf(undefined);
    }
  };

  function filterUsers(data) {
    const filteredUsers = searchQuery
      ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
      : selectedProf
      ? data.filter((user) => user.profession._id === selectedProf._id)
      : data;
    return filteredUsers.filter((user) => user._id !== currentUser._id);
  }

  const filteredUsers = filterUsers(users);
  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  // Условие добавил для устранения бага который не отображал пользователей если удалены все пользователи на последней странице у выбранной профессии.
  if (userCrop.length === 0 && currentPage > -1) {
    setCurrentPage((prevState) => prevState - 1);
  }
  const clearFilter = () => {
    // Избежать лишнего вызова setSelectedProf()
    if (selectedProf !== undefined) {
      setSelectedProf();
    }
  };

  return (
    <>
      <div className="d-flex">
        {professions && !professionsLoading && (
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
          <SearchPanel
            handleSearchQuery={handleSearchQuery}
            searchQuery={searchQuery}
          />
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
              itemsCount={count}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListPage;
