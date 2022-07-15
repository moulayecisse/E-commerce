import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "./common/EventBus.js";

const Navbar = () => {
  const [, setShowModeratorBoard] = useState(false);
  const [, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      const decodedJwt = parseJwt(user.token);
      console.warn(parseJwt(user.token));
      // console.warn(user);
      setCurrentUser(decodedJwt);
      setShowModeratorBoard(decodedJwt.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(decodedJwt.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logout();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logout = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <nav className="px-5 navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
      <Link to="/">
        {" "}
        <svg
          fill="#111"
          width="40px"
          height="40px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 294 294"
        >
          <path d="M95.667 97h101v101h-101V97zm165 38v24H279c8.284 0 15 6.716 15 15s-6.716 15-15 15h-18.333v25H279c8.284 0 15 6.716 15 15s-6.716 15-15 15h-18.333v1.5c0 8.284-6.549 15.5-14.833 15.5h-2.167v18c0 8.284-6.716 15-15 15s-15-6.716-15-15v-18h-25v18c0 8.284-6.716 15-15 15s-15-6.716-15-15v-18h-24v18c0 8.284-6.716 15-15 15s-15-6.716-15-15v-18h-25v18c0 8.284-6.716 15-15 15s-15-6.716-15-15v-18H48.5c-8.284 0-15.833-7.216-15.833-15.5V244H15c-8.284 0-15-6.716-15-15s6.716-15 15-15h17.667v-25H15c-8.284 0-15-6.716-15-15s6.716-15 15-15h17.667v-24H15c-8.284 0-15-6.716-15-15s6.716-15 15-15h17.667V80H15C6.716 80 0 73.284 0 65s6.716-15 15-15h17.667v-1.5c0-8.284 7.549-14.5 15.833-14.5h1.167V15c0-8.284 6.716-15 15-15s15 6.716 15 15v19h25V15c0-8.284 6.716-15 15-15s15 6.716 15 15v19h24V15c0-8.284 6.716-15 15-15s15 6.716 15 15v19h25V15c0-8.284 6.716-15 15-15s15 6.716 15 15v19h2.167c8.284 0 14.833 6.216 14.833 14.5V50H279c8.284 0 15 6.716 15 15s-6.716 15-15 15h-18.333v25H279c8.284 0 15 6.716 15 15s-6.716 15-15 15h-18.333zm-34-53c0-8.284-6.716-15-15-15h-131c-8.284 0-15 6.716-15 15v131c0 8.284 6.716 15 15 15h131c8.284 0 15-6.716 15-15V82z" />
        </svg>
      </Link>
      <ul className="navbar-nav align-items-center">
        <Link to="/list" className="nav-link ml-5">
          Products
        </Link>
      </ul>

      <Link to="/cart" className="ml-auto">
        <button className="  btn btn-primary btn-block ">
          <span>My cart</span>
        </button>
      </Link>
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profil"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logout}>
              Logout
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
