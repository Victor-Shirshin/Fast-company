import React, { useState } from "react";

import Users from "./users";
import SearchStatus from "./searchStatus";
import Bookmark from "./bookmark";

import api from "../api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll()); // Hook useState()
  // удаление элемента при 'клике' на button
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  return (
    <>
      <Bookmark />
      <SearchStatus length={users.length} />
      <Users users={users} handleDelete={handleDelete} />
    </>


  )
}

export default App;