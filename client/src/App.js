import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </section>
    </div>
  );
};

export default App;
