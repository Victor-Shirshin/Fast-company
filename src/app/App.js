import React, { useState } from "react";

import Users from "../app/components/users";
import SearchStatus from "../app/components/searchStatus";

import api from "../app/api/index";

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
      <SearchStatus length={users.length} />
      <Users users={users} handleDelete={handleDelete} handleToggleBookMark={handleToggleBookMark} />
    </>
  );
}

export default App;
