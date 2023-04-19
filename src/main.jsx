import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Pokemon from "./components/pokemon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/pokemon/:id">
          <Pokemon />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);
