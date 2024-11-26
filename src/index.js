import React from "react";

import ReactDOM from "react-dom/client";

// ~ Main All Component
import App from "./App";

// ~ Import BrowserRouter For Routing From react-router-dom
import { BrowserRouter } from "react-router-dom";

// ~ Import Provider For rap App in Store
import { Provider } from "react-redux";

// ~ Import Store
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
