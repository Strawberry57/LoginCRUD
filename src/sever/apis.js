const axios = require("axios");
axios.defaults.baseURL = "https://62396f2d043817a543e26d2a.mockapi.io/login";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
export const getUsers = async () => {
  return await axios.get("/account");
};

export const createUser = async (data) => {
  return await axios.post("/account", data);
};

export const updateUser = async (key, data) => {
  return await axios.put(`/account/${key}`, data);
};
export const deleteUser = async (key) => {
  return await axios.delete(`/account/${key}`);
};
