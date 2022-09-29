import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Users from "./layout/users.jsx";
import NavBar from "./components/ui/navBar.jsx";
import Main from "./layout/main.jsx";
import Login from "./layout/login.jsx";
import { ProfessionProvider } from "./components/hooks/useProfession.jsx";
import { QualitiesProvider } from "./components/hooks/useQualities.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
