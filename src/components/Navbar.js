import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = state => ({
  isLoggedIn: state.login.message
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({ type: "success", payload: false });
  }
});
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  handleOnLogoutClick() {
    localStorage.clear();
    this.props.logout();
    this.props.history.push("/");
  }

  componentDidUpdate() {}

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="protected-route">
                User profile
              </Link>
            </li>
            <li className="nav-item protected-route">
              <Link to={"/projects"} className="protected-route">
                Projects
              </Link>
            </li>
            <li className="nav-item protected-route">
              <Link to={"/settings"} className="protected-route">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"}>About</Link>
            </li>
          </ul>
        </div>
        {this.props.isLoggedIn && (
          <div id="logout" onClick={() => this.handleOnLogoutClick()}>
            Logout
          </div>
        )}
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
