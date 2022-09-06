import React from "react";
import { useParams } from "react-router-dom";

import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserPageEditor from "../components/page/userPage/userPageEditor";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  // return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
  return (
    <>
      {userId ? (
        edit ? (
          <UserPageEditor userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
