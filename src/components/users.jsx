import { useState } from "react";
import api from "../api";
import SearchStatus from "./searchStatus";
import Qualitie from "./qualitie";

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
            {users.map((user) => (
              <tr key={user._id}>
                <Qualitie name={user.name} color={user.qualities} />
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
