import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="logout" onClick={() => this.props.logout()}>
        Logout
      </div>
    );
  }
}

export default withRouter(Logout);
