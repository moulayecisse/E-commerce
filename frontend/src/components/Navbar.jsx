import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./DropdownCart";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus.js";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import axios from "axios";
import SearchInput from "../components/Search";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart); //counttotalquantity

  const [datacategories, setDataCategories] = useState([]);

  //user auth
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
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
      // console.warn(parseJwt(user.token));
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

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const res = await axios.get("https://localhost:8000/api/categories");
      // console.log(res.data['hydra:member'])
      setDataCategories(res.data["hydra:member"]);
      // (res.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav class="relative flex h-14 items-center items-center justify-between bg-sky-600 px-5 drop-shadow-md">
        <div>
          <a href="#" class="text-2xl italic text-white">
            PC<span class="text-amber-500">Builder</span>
          </a>
        </div>

        <div
          id="main-nav"
          class="absolute top-14 right-0 flex hidden h-screen flex-col items-center bg-gray-600 px-5 py-10 
 md:relative md:top-0 md:right-0 md:ml-10 md:flex md:h-full md:flex-grow md:flex-row md:items-center md:justify-between md:space-y-0 md:bg-inherit md:p-0"
        >
          <div class="order-last flex flex-col items-end space-y-3 text-sky-200 md:order-first md:flex-row md:items-start md:space-y-0 md:space-x-3 ">
            <Menu as="div" className="relative inline-block text-left ">
              <div>
                <Menu.Button className=" inline-flex w-full justify-center rounded px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100">
                  Categories
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {datacategories.map((categorie, index) => (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            key={index}
                            to={`/?categorie=${categorie.slug}`}
                            className={classNames(
                              active ? " text-gray-900" : "text-gray-50",
                              "block px-3 py-2 "
                            )}
                          >
                            {categorie.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="flex list-none items-center  ">
              {showModeratorBoard && (
                <li className="nav-item">
                  <NavLink to={"/mod"} className="nav-link ml-7 items-center">
                    Moderator Board
                  </NavLink>
                </li>
              )}

              {showAdminBoard && (
                <NavLink to={"/admin"} className="   text-gray-200">
                  Admin
                </NavLink>
              )}

              {currentUser ? (
                <div className="flex list-none items-center whitespace-nowrap ">
                  <NavLink
                    to={"/"}
                    onClick={logout}
                    className="  px-3 py-2 text-gray-200"
                  >
                    Logout
                  </NavLink>
                </div>
              ) : (
                <div className="flex list-none items-center whitespace-nowrap ">
                  <NavLink to={"/login"} className="  px-3 py-2 text-gray-600">
                    Login
                  </NavLink>

                  <NavLink
                    to={"/register"}
                    className="  px-3 py-2 text-gray-600"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
              <SearchInput />

              <NavLink to={"/product/cart"}>
                <div className="nav-bag ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-handbag-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                  </svg>
                  <span className="bag-quantity">
                    <span>{cartTotalQuantity}</span>
                  </span>
                </div>
              </NavLink>

              <Dropdown />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
