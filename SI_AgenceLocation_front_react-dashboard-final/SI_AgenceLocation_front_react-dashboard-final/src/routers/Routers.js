import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import CarListing from "../pages/CarListing";
import Dealoptions from "../components/UI/Dealoptions";
import RechercheCarsDetails from "../pages/RechercheCars";
import Choixsupplémentaire from "../components/UI/Choixsupplémentaire";
import UserDashboard from "../user/UserDashboard";
import Dashboard from "../user/components/Dashboard";
import Login from "user/pages/auth/Login";
import Register from "user/pages/auth/Register";
import ForgetPassword from "user/pages/auth/ForgotPassword";
import ResetPassword from "user/pages/auth/ResetPassword";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/Recherche-Cars" element={<RechercheCarsDetails />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />

      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgetPassword />} />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

      <Route path="/dashboard" element={<UserDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
