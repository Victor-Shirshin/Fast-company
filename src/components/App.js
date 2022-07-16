import React, { useState } from "react";

import Users from "./users";
import SearchStatus from "./searchStatus";

import api from "../api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  // удаление элемента при 'клике' на button
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  // const handleToggleBookMark = () => {
  //   if (className) {
  //     console.log(className);
  //     className = "bi-bookmark-fill";
  //   } else {
  //     className = "bi bi-bookmark";
  //   }
  //   console.log("aaaaaaaaaaaaaa");
  // };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users users={users} handleDelete={handleDelete} />
    </>


  )
}

export default App;