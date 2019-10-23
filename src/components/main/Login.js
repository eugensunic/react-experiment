import React, { Component } from "react";
import { mockLoginRequest } from "../../helpers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import loginService from "../services/login.service";

const mapDispatchToProps = dispatch => ({
  loginSuccess: () => {
    dispatch({ type: "success", payload: true });
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordError: null,
      usernameError: null,
      submitRequest: false
    };
  }
  // validation methods BEGIN
  isUsernameValid(username) {
    return username.indexOf("@") > -1;
  }

  isEmpty(param) {
    return !param;
  }

  isPasswordLessThan5(password) {
    return password.length < 5;
  }

  isFrontendValid(username, password) {
    return (
      this.isUsernameValid(username) && !this.isPasswordLessThan5(password)
    );
  }
  // validation methods END

  validCredentials(res) {
    return res.users.some(
      x =>
        this.state.username === x.username && this.state.password === x.password
    );
  }

  validateUser(username, password) {
    // FE validation
    this.setState({ passwordError: "" });
    if (!this.isFrontendValid(username, password)) {
      if (this.isEmpty(username)) {
        this.setState({ usernameError: "Please provide username" });
      } else if (!this.isUsernameValid(username)) {
        this.setState({ usernameError: "Please provide valid username/mail" });
      }
      if (this.isEmpty(password)) {
        this.setState({ passwordError: "Please provide password" });
      } else if (this.isPasswordLessThan5(password)) {
        this.setState({ passwordError: "Password too short" });
      }
      return;
    }

    // BE validation
    this.setState({ submitRequest: true });
    setTimeout(
      _ =>
        mockLoginRequest("/database/users.json")
          .then(res =>
            this.validCredentials(res)
              ? this.setState(
                  {
                    passwordError: "",
                    submitRequest: false
                  },
                  () => {
                    localStorage.setItem("user", "bam");
                    this.props.history.push("/profile");
                    this.props.loginSuccess();
                  }
                )
              : this.setState({
                  passwordError: "Wrong crendentials, Try again",
                  submitRequest: false
                })
          )
          .catch(x => console.log("error occurred", x)),
      1000
    );
  }

  render() {
    return (
      <div className="row">
        <div
          className="card card-signin my-5 center"
          style={{ opacity: localStorage.getItem("user") ? 0.4 : 1 }}
        >
          <div className="card-body">
            <h5 className="card-title text-center">Admin area</h5>
            <div className="form-signin">
              <div className="form-label-group">
                <input
                  type="email"
                  id="username"
                  className="form-control"
                  placeholder="Username/mail"
                  required
                  onChange={e =>
                    this.setState({
                      username: e.target.value,
                      usernameError: null
                    })
                  }
                />
                <label htmlFor="inputEmail">Email address</label>
              </div>

              {this.state.usernameError && (
                <div className="error-container">
                  {this.state.usernameError}
                </div>
              )}

              <div className="form-label-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e =>
                    this.setState({
                      password: e.target.value,
                      passwordError: null
                    })
                  }
                  required
                />
                <label htmlFor="inputPassword">Password</label>
              </div>
              {this.state.passwordError && (
                <div className="error-container">
                  {this.state.passwordError}
                </div>
              )}
              {this.state.submitRequest && <div className="loader"></div>}
              <button
                className="btn btn-lg btn-primary btn-block text-uppercase"
                disabled={!!localStorage.getItem("user")}
                type="submit"
                onClick={() =>
                  this.validateUser(this.state.username, this.state.password)
                }
              >
                Log in
              </button>
              <hr className="my-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
