import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import {
  isUsernameValid,
  isEmpty,
  isPasswordLessThan5
} from "../../services/login.service.js";

function Login() {
  const [obj, setCredential] = useState({
    username: "",
    password: "",
    passwordError: null,
    usernameError: null,
    submitRequest: false
  });

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
      // one time update
      setCredential({
        ...obj,
        usernameError: usernameErr,
        passwordError: passwordErr
      });
      return;
    }
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

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       passwordError: null,
//       usernameError: null,
//       submitRequest: false
//     };
//   }

//   isFrontendValid(username, password) {
//     return isUsernameValid(username) && !isPasswordLessThan5(password);
//   }

//   validCredentials(res) {
//     return res.users.some(
//       x =>
//         this.state.username === x.username && this.state.password === x.password
//     );
//   }

//   validateUser(username, password) {
//     // FE validation
//     this.setState({ passwordError: "" });
//     if (!this.isFrontendValid(username, password)) {
//       if (isEmpty(username)) {
//         this.setState({ usernameError: "Please provide username" });
//       } else if (!isUsernameValid(username)) {
//         this.setState({ usernameError: "Please provide valid username/mail" });
//       }
//       if (isEmpty(password)) {
//         this.setState({ passwordError: "Please provide password" });
//       } else if (isPasswordLessThan5(password)) {
//         this.setState({ passwordError: "Password too short" });
//       }
//       return;
//     }

//     // BE validation
//     this.setState({ submitRequest: true });
//     setTimeout(
//       _ =>
//         mockLoginRequest("/database/users.json")
//           .then(res =>
//             this.validCredentials(res)
//               ? this.setState(
//                   {
//                     passwordError: "",
//                     submitRequest: false
//                   },
//                   () => {
//                     localStorage.setItem("user", "bam");
//                     this.props.history.push("/profile");
//                     this.props.loginSuccess();
//                   }
//                 )
//               : this.setState({
//                   passwordError: "Wrong crendentials, Try again",
//                   submitRequest: false
//                 })
//           )
//           .catch(x => console.log("error occurred", x)),
//       1000
//     );
//   }

//   render() {
//     return (
//       <div className="row">
//         <div
//           className="card card-signin my-5 center"
//           style={{ opacity: localStorage.getItem("user") ? 0.4 : 1 }}
//         >
//           <div className="card-body">
//             <h5 className="card-title text-center">Admin area</h5>
//             <div className="form-signin">
//               <div className="form-label-group">
//                 <input
//                   type="email"
//                   id="username"
//                   className="form-control"
//                   placeholder="Username/mail"
//                   required
//                   onChange={e =>
//                     this.setState({
//                       username: e.target.value,
//                       usernameError: null
//                     })
//                   }
//                 />
//                 <label htmlFor="inputEmail">Email address</label>
//               </div>

//               {this.state.usernameError && (
//                 <div className="error-container">
//                   {this.state.usernameError}
//                 </div>
//               )}

//               <div className="form-label-group">
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   placeholder="Password"
//                   onChange={e =>
//                     this.setState({
//                       password: e.target.value,
//                       passwordError: null
//                     })
//                   }
//                   required
//                 />
//                 <label htmlFor="inputPassword">Password</label>
//               </div>
//               {this.state.passwordError && (
//                 <div className="error-container">
//                   {this.state.passwordError}
//                 </div>
//               )}
//               {this.state.submitRequest && <div className="loader"></div>}
//               <button
//                 className="btn btn-lg btn-primary btn-block text-uppercase"
//                 disabled={!!localStorage.getItem("user")}
//                 type="submit"
//                 onClick={() =>
//                   this.validateUser(this.state.username, this.state.password)
//                 }
//               >
//                 Log in
//               </button>
//               <hr className="my-4" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
