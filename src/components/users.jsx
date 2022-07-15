import { useState } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";

// Компонент Users
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll()); // Hook useState()
  // удаление элемента при 'клике' на button
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  return (
    <>
      <SearchStatus length={users.length} />
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Профессия</th>
              <th>Встретился,раз</th>
              <th>Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <User users={users} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
