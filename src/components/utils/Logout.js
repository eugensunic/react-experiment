import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  handleOnLogoutClick() {
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {
    return (
      <div id="logout" onClick={() => this.handleOnLogoutClick()}>
        Logout
      </div>
    );
  }
}

export default withRouter(Logout);
