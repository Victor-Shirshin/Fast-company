import React from "react";
import { useParams, Redirect } from "react-router-dom";

import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserPageEditor from "../components/page/userPage/userPageEditor";
import UserProvider from "../components/hooks/useUsers";
import { useAuth } from "../components/hooks/useAuth";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <UserPageEditor />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
