import React, { useReducer } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./helpers";
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

// global error reducer
const reducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "global":
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

export const GlobalErrorContext = React.createContext();

function App() {
  const [error, dispatch] = useReducer(reducer, "");
  return (
    <GlobalErrorContext.Provider value={{ dispatchError: dispatch }}>
      <Router history={history}>
        <Navbar />
        <ErrorContainer message={error.message} />
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
    </GlobalErrorContext.Provider>
  );
}

export default App;
