import React from "react";

function Footer() {
  return (
    <div className="footer">
      <ul>
        <li>
          <span className="protected-route">red links</span> (protected routes){" "}
        </li>
        <li>
          <span className="unprotected-route">blue links</span> (unprotected
          routes){" "}
        </li>
        <li>
          login mocked (no backend, passwords unhashed),
          <a href="/database/users.json" target="_blank">
            &nbsp;Users
          </a>
        </li>
        <li>
          reload deletes all your states, login remains unless localStorage
          deleted
        </li>
      </ul>
    </div>
  );
}

export default Footer;
