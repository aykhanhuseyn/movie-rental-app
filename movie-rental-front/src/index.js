import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import Loader from "./pages/loader";
import store from "./redux/store";
import "./index.css";

ReactDOM.render(
  <React.Suspense fallback={Loader}>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </React.Suspense>,
  document.getElementById("root")
);
