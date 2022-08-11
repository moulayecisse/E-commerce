import axios from "axios";

const API_URL = "https://127.0.0.1:8000/api/login_check";
const register = (username, email, password) => {
  return axios.post(API_URL, {
    username,
    email,
    password,
  });
};
const login = async (username, password) => {
  const response = await axios.post(API_URL, {
    username,
    password,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  fetch("https://127.0.0.1:8000/persist_cart", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: JSON.parse(localStorage.getItem("user")),
      cartItems: JSON.parse(localStorage.getItem("cartItems")),
    }),
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((response) => console.warn(response))
    .catch((err) => console.error(err));
  /**
   * TODO
   * At login we should be able to retrieve the user's cart if it exists and not overwrite any change in the localstorage
   */
  localStorage.removeItem("user");
  const response = await axios.post("https://127.0.0.1:8000/api/logout"); // No route found for "POST https://127.0.0.1:8000/api/logout" (from "http://localhost:3000/")
  console.warn(response);
  return response.data;
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
