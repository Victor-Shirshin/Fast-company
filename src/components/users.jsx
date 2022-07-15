import { useState } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";

// Компонент Users
const Users = ({ users, handleDelete }) => {
  return (
    <>
      {/* <SearchStatus length={users.length} /> */}
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
            <User users={users} handleDelete={handleDelete} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
