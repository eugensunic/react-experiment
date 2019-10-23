import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  isLoggedIn: state.login.status
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({ type: "success", payload: false });
  }
});

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  handleOnLogoutClick() {
    localStorage.clear();
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    if (!this.props.isLoggedIn) {
      return "";
    }
    return (
      <div id="logout" onClick={() => this.handleOnLogoutClick()}>
        Logout
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Logout));
