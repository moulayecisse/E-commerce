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
  localStorage.removeItem("user");
  const response = await axios.post("https://127.0.0.1:8000/api/logout");
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
