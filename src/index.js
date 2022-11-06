import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "../src/app/App";
import { createStore } from "./app/store/createStore";
import history from "./app/utils/history";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  // </React.StrictMode>
);
