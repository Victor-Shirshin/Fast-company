import React, { useState } from "react";

import api from "../app/api/index";

import Users from "../app/components/users";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

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
      <Users users={users} handleDelete={handleDelete} handleToggleBookMark={handleToggleBookMark} />
    </>
  );
}

export default App;
