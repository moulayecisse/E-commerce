import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus.js";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [datacategories, setDataCategories] = useState([]);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
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

  useEffect(() => {
    getCategories();
  }, []);
  const logout = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  const getCategories = async () => {
    try {
      const res = await axios.get("https://127.0.0.1:8000/api/categories");
      console.log(res.data["hydra:member"]);
      setDataCategories(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            PC-Builder
          </Link>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logout}>
                  logout
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

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
