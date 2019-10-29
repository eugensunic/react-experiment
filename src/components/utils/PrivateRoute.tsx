import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: RouteProps) =>
    localStorage.getItem("user") ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
