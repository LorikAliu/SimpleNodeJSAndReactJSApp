import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register/";
import Login from "./components/Login/";
import Home from "./components/Home/";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
