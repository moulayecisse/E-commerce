import React, { Fragment, useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./DropdownCart";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus.js";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactHover from "react-hover/dist/ReactHover";
import { Hover, Trigger } from "react-hover";
import Cart from "../Routes/User/Cart";
import { Swiper, SwiperSlide } from "swiper/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ setCategory }) => {
  const navigate = useNavigate();

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

      setDataCategories(res.data["hydra:member"]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white">
        <main className="">
          <div className="relative z-10 mx-auto flex max-w-screen-lg flex-row items-center justify-between space-x-2 p-4 align-middle sm:space-x-3 sm:p-7">
            <NavLink
              className="relative flex h-14 items-center items-center justify-between px-5 drop-shadow-md"
              to="/"
            >
              <div>
                <a href="#" className="text-2xl italic text-black">
                  Buy<span className="text-amber-500">Zone</span>
                </a>
              </div>
            </NavLink>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {datacategories.map((categorie) => (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              // Navigate
                              navigate("/");

                              setCategory(categorie.slug);
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {categorie.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <>
              {showModeratorBoard && (
                <NavLink to={"/mod"} className="nav-link">
                  Moderator Board
                </NavLink>
              )}

              {showAdminBoard && (
                <NavLink
                  to={"/admin/products"}
                  className="ml-7 list-none whitespace-nowrap rounded border border-gray-300 px-4 py-2 text-gray-700 hover:border-gray-400"
                >
                  Admin
                </NavLink>
              )}

              {currentUser ? (
                <>
                  <NavLink to={"/profile"} className=" ml-7 items-center">
                    {currentUser.username}
                  </NavLink>
                  <NavLink
                    to={"/"}
                    onClick={logout}
                    className="ml-7 list-none whitespace-nowrap rounded border border-gray-300 px-4 py-2 text-gray-700 hover:border-gray-400"
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={"/login"}
                    className="ml-7 list-none whitespace-nowrap rounded border border-gray-300 px-4 py-2 text-gray-700 hover:border-gray-400"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to={"/register"}
                    className="ml-7 list-none whitespace-nowrap rounded border border-gray-300 px-4 py-2 text-gray-700 hover:border-gray-400"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}

              <NavLink to={"/product/cart"}>
                <div className="nav-bag">
                  <ReactHover>
                    <Trigger type="trigger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        className="bi bi-handbag-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                      </svg>
                    </Trigger>
                    <Hover type="hover">
                      <div className="flex rounded border-2 border-solid backdrop-blur-3xl">
                        <Cart />
                      </div>
                    </Hover>
                  </ReactHover>
                  <span className="bag-quantity">
                    <span>{cartTotalQuantity}</span>
                  </span>
                </div>
              </NavLink>

              <Dropdown />
            </>
          </div>
        </main>
      </div>
    </>
  );
};

export default Navbar;
