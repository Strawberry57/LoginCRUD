import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../Page/Login/Login/Login";
import Manager from "../../Page/Manager/Manager";
import NewAccount from "../../Page/Login/NewAccount/NewAccount";
import ForgotPassword from "../../Page/Login/ForgotPassword/ForgotPassword";
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
