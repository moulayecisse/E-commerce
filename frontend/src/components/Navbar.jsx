import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus.js";
import axios from "axios";

const Navbar = () => {
  const [cart, setCart] = useState({});

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
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
    console.warn(cart);
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
      <nav
        className="navbar navbar-expand navbar-dark bg-dark"
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div className="container-fluid">
          <NavLink to={"/"} className="navbar-brand">
            PC-Builder
          </NavLink>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to={"/home"} className="nav-link">
                Home
              </NavLink>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <NavLink to={"/mod"} className="nav-link">
                  Moderator Board
                </NavLink>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <NavLink to={"/admin"} className="nav-link">
                  Admin
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to={"/cart"} className="nav-link">
                <i className="fa-light fa-cart-plus"></i>
              </NavLink>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to={"/profile"} className="nav-link">
                  {currentUser.username}
                </NavLink>
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
                <NavLink to={"/login"} className="nav-link">
                  Login
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/register"} className="nav-link">
                  Sign Up
                </NavLink>
              </li>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
