import React, { useState, useEffect } from "react";

import api from "../app/api/index";

import Users from "../app/components/users";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  // удаление элемента при 'клике' на button
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  return (
    <>
      {users && (
        <Users users={users} handleDelete={handleDelete} handleToggleBookMark={handleToggleBookMark} />
      )}
    </>
  );
}

export default App;
