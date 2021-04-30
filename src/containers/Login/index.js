import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import { Route, Switch } from "react-router-dom";

function Login() {
  return (
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
      </Switch>
  );
}

export default Login;
