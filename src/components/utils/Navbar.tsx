import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function Navbar({ history }: RouteComponentProps) {
  const handleOnLogoutClick = (): void => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/#">
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
      <Logout logout={handleOnLogoutClick} />
    </nav>
  );
}

export default withRouter(Navbar);
