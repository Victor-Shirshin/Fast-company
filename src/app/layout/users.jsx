import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserPageEditor from "../components/page/userPage/userPageEditor";
// import UserProvider from "../components/hooks/useUsers";
// import { useAuth } from "../components/hooks/useAuth";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";
// import { getDataStatus } from "../store/users";

const Users = () => {
  // const dataStatus = useSelector(getDataStatus()); перенесли в HOC usersLoader.jsx
  // const dispatch = useDispatch(); перенесли в HOC usersLoader.jsx
  const params = useParams();
  const { userId, edit } = params;
  // const { currentUser } = useAuth();
  const currentUserId = useSelector(getCurrentUserId());

  // useEffect(() => { перенесли в HOC usersLoader.jsx
  //   if (!dataStatus) dispatch(loadUsersList());
  // }, []);

  // if (!dataStatus) return "loading"; перенесли в HOC usersLoader.jsx

  return (
    <>
      <UsersLoader>
        {/* <UserProvider> */}
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <UserPageEditor />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
        {/* </UserProvider> */}
      </UsersLoader>
    </>
  );
};

export default Users;
