import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Users from "./layout/users.jsx";
import Main from "./layout/main.jsx";
import Login from "./layout/login.jsx";
import logOut from "./layout/logOut.jsx";
import NavBar from "./components/ui/navBar.jsx";
import { ProfessionProvider } from "./components/hooks/useProfession.jsx";
import { QualitiesProvider } from "./components/hooks/useQualities.jsx";
import AuthProvider from "./components/hooks/useAuth.jsx";
import ProtectedRoute from "./components/common/protectedRoute.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={logOut} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  );
}

export default App;
