import { useState } from "react";
import api from "../api";

// Компонент Users
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll()); // Hook useState()

  let addRenderClass = users.length === 0 ? "danger" : "primary";

  // удаление элемента при 'клике' на button
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const arr = [
      "человека тусанут",
      "человек тусанёт",
      "человек тусанут",
      "Никто с тобой не тусанёт",
    ];
    if (number === 0) {
      return `${arr[3]}`;
    }
    if (number % 10 === 0 || (number > 10 && number <= 19)) {
      return `${number} ${arr[2]} с тобой сегодня`;
    } else if (
      (number >= 2 && number <= 4) ||
      (number % 10 >= 2 && number % 10 <= 4)
    ) {
      return `${number} ${arr[0]} с тобой сегодня`;
    } else if (
      (number >= 5 && number <= 9) ||
      (number % 10 >= 5 && number % 10 <= 9) ||
      number % 10 === 1
    ) {
      return `${number} ${arr[1]} с тобой сегодня`;
    }
  };

  return (
    <>
      <h2>
        <span className={`badge bg-${addRenderClass}`}>{`${renderPhrase(
          users.length
        )}`}</span>
      </h2>
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
                <td>{user.name}</td>
                <td>
                  {" "}
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge bg-${quality.color} m-1`}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
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
