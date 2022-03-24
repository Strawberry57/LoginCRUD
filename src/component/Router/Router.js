import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Manager from "../Manager/Manager";
import NewAccount from "../Login/NewAccount";
import ForgotPassword from "../Login/ForgotPassword";
function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Manager" element={<Manager />} />
        <Route path="/login/create_account" element={<NewAccount />} />
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default Router;
