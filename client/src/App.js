import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import { loadUser } from "./redux/auth/authActions";
import { useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";

const App = () => {
  const dispatch = useDispatch();

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

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
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/create-profile" component={CreateProfile} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/add-experience" component={AddExperience} />
          <PrivateRoute path="/add-education" component={AddEducation} />
        </Switch>
      </section>
    </div>
  );
};

export default App;
