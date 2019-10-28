import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { mockLoginRequest } from "../../helpers/mock-call";

import {
  isUsernameValid,
  isEmpty,
  isPasswordLessThan5
} from "../../services/login.service.js";

function Login(props) {
  const [obj, setCredential] = useState({
    username: "",
    password: "",
    passwordError: null,
    usernameError: null,
    submitRequest: false,
    loginSuccess: false
  });

  useEffect(() => {
    if (!obj.loginSuccess) return;
    console.log("success");
    localStorage.setItem("user", "bam");
    props.history.push("/profile");
  }, [obj.loginSuccess]);

  useEffect(() => {
    if (!obj.submitRequest) return;
    setTimeout(
      _ =>
        mockLoginRequest("/database/users.json")
          .then(res =>
            validCredentials(res)
              ? setCredential({
                  ...obj,
                  passwordError: "",
                  loginSuccess: true,
                  submitRequest: false
                })
              : setCredential({
                  ...obj,
                  passwordError: "Wrong credentials, Try again",
                  submitRequest: false
                })
          )
          .catch(x => console.log("error occurred", x)),
      1000
    );
  }, [obj.submitRequest]);

  const isFrontendValid = (username, password) => {
    return isUsernameValid(username) && !isPasswordLessThan5(password);
  };

  const validCredentials = res => {
    return res.users.some(
      x => obj.username === x.username && obj.password === x.password
    );
  };

  const validateUser = (username, password) => {
    // FE validation
    let usernameErr = "";
    let passwordErr = "";

    if (!isFrontendValid(username, password)) {
      if (isEmpty(username)) {
        usernameErr = "Please provide username";
      } else if (!isUsernameValid(username)) {
        usernameErr = "Please provide valid username/mail";
      }
      if (isEmpty(password)) {
        console.log("entered empty password");
        passwordErr = "Please provide password";
      } else if (isPasswordLessThan5(password)) {
        passwordErr = "Password too short";
      }
      setCredential({
        ...obj,
        usernameError: usernameErr,
        passwordError: passwordErr
      });
      return;
    }
    // one time update
    setCredential({
      ...obj,
      submitRequest: true
    });
  };
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
                  setCredential({
                    ...obj,
                    username: e.target.value,
                    usernameError: ""
                  })
                }
              />
              <label htmlFor="inputEmail">Email address</label>
            </div>

            {obj.usernameError && (
              <div className="error-container">{obj.usernameError}</div>
            )}

            <div className="form-label-group">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                onChange={e =>
                  setCredential({
                    ...obj,
                    password: e.target.value,
                    passwordError: ""
                  })
                }
                required
              />
              <label htmlFor="inputPassword">Password</label>
            </div>
            {obj.passwordError && (
              <div className="error-container">{obj.passwordError}</div>
            )}
            {obj.submitRequest && <div className="loader"></div>}
            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              disabled={!!localStorage.getItem("user")}
              type="submit"
              onClick={() => validateUser(obj.username, obj.password)}
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

export default withRouter(Login);
