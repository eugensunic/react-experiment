import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  console.log("deep inside state", state.message);
  return {
    isLoggedIn: state.login.message
  };
};

class About extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    console.log("about updating", this.props);
  }
  render() {
    console.log("in about render", this.props.isLoggedI);
    return <div id="container-about">About page{this.props.isLoggedIn}</div>;
  }
}

export default connect(mapStateToProps)(About);
