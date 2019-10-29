import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface LogoutEventHandlers extends RouteComponentProps {
  logout: () => void;
}

function Logout({ logout }: LogoutEventHandlers) {
  return (
    <div id="logout" onClick={() => logout()}>
      Logout
    </div>
  );
}

export default withRouter(Logout);
