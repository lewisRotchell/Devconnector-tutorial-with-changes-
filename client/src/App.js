import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import { loadUser } from "./redux/auth/authActions";
import setAuthToken from "./utils/setAuthToken";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Navbar />

      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </section>
    </div>
  );
};

export default App;
