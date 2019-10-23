import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./helpers";
import { connect } from "react-redux";
// main
import Login from "./components/main/Login";
import Settings from "./components/main/Settings";
import About from "./components/main/About";
import EventProjects from "./components/main/EventProjects";
import UserProfile from "./components/main/UserProfile";
// utils
import NoMatch from "./components/utils/NoMatch";
import PrivateRoute from "./components/utils/PrivateRoute";
import Navbar from "./components/utils/Navbar";
import Footer from "./components/utils/Footer";
import ErrorContainer from "./components/utils/ErrorContainer";

const mapStateToProps = state => {
  return {
    errorMessage: state.globalError.message
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Navbar />
          <ErrorContainer message={this.props.errorMessage} />
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
}

export default connect(
  mapStateToProps,
  null
)(App);
