import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Users from "./layout/users.jsx";
import Main from "./layout/main.jsx";
import Login from "./layout/login.jsx";
import LogOut from "./layout/logOut.jsx";
import NavBar from "./components/ui/navBar.jsx";
// import { ProfessionProvider } from "./components/hooks/useProfession.jsx";
// import { QualitiesProvider } from "./components/hooks/useQualities.jsx";
// import AuthProvider from "./components/hooks/useAuth.jsx";
import ProtectedRoute from "./components/common/protectedRoute.jsx";
import AppLoader from "./components/ui/hoc/appLoader.jsx";
// import { loadQualitiesList } from "./store/qualities.js";
// import { loadProfessionsList } from "./store/professions.js";
// import { loadUsersList } from "./store/users.js";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadQualitiesList());
  //   dispatch(loadProfessionsList());
  //   dispatch(loadUsersList());
  // }, []);

  return (
    <>
      <AppLoader>
        {/* <AuthProvider> */}
        <NavBar />
        {/* <ProfessionProvider> */}
        {/* <QualitiesProvider> */}
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
        {/* </QualitiesProvider> */}
        {/* </ProfessionProvider> */}
        {/* </AuthProvider> */}
      </AppLoader>

      <ToastContainer />
    </>
  );
}

export default App;
