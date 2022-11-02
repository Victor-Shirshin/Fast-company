import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "../src/app/App";
import { createStore } from "./app/store/createStore";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
