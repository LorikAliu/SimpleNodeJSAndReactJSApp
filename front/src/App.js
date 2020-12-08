import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register/";
import Login from "./components/Login/";
import Home from "./components/Home/";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";

import "./index.css";

function App() {
  const [filterChange, setFilterChange] = useState(null);

  const filterRequest = (value) => {
    setFilterChange(value);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <Route exact path={["/", "/home"]} component={Home} /> */}
          <Route exact path={["/", "/home"]} component={() => <Home filterChanged={filterRequest} /> } />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/createproduct" component={CreateProduct} />
          <Route exact path="/editproduct/:id" component={EditProduct} /> */}
          <Route exact path="/createproduct" component={() => <CreateProduct filterChanged={filterRequest} />} />
          <Route exact path="/editproduct/:id" component={() => <EditProduct filterChanged={filterRequest} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
