import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./helpers";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import Settings from "./components/Settings";
import About from "./components/About";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";
import EventProjects from "./components/EventProjects";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <PrivateRoute path="/projects" component={EventProjects} />
          <Route path="/about" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
