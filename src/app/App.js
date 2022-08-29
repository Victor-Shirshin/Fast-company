import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layout/users.jsx";
import NavBar from "./components/ui/navBar.jsx";
import Main from "./layout/main.jsx";
import Login from "./layout/login.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
