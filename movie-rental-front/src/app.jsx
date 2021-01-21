import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Data, checkTokenNotExpired } from "./utils";
import { login, logout } from "./redux/slices";
import Layout from "./components/layout";
import Register from "./pages/register";
import Login from "./pages/login";

const App = () => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.credentials);

  token && !checkTokenNotExpired(token) && dispatch(logout());

  if (user && token)
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={() => <div>home</div>} />
          <Route path="/movies" exact component={() => <div>movies</div>} />
          <Route path="/contact" exact component={() => <div>contact</div>} />
          <Route render={() => <Redirect to={"/"} />} />
        </Switch>
      </Layout>
    );
  else {
    return (
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route render={() => <Redirect to={"/login"} />} />
        </Switch>
      </Layout>
    );
  }
};

export default App;
