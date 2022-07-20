import User from "./user";
import Pagination from "./pagination";
import { useState } from "react";

const Users = ({ users, handleDelete }) => {
  const count = users.length;
  const pageSize = 4; // сколько человек хотим отобразить на странице
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    console.log("page ", pageIndex);
    setCurrentPage(pageIndex);
  };

  // разрезали кол-во человек на массив по 4 человека
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const userCrop = paginate(users, currentPage, pageSize); // (4) [{…}, {…}, {…}, {…}] по 4 человека

  return (
    <>
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
            <User
              users={users}
              handleDelete={handleDelete}
              userCrop={userCrop}
            />
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

export default Users;
