//mport logo from './logo.svg';
//import './App.css';

import { isLoggin } from "globals";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "user/components/Dashboard";
import SessionService from "user/service/SessionService";
import UserDashboard from "user/UserDashboard";
import Layout from "./components/Layout/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = SessionService.getToken();

  useEffect(() => {
    if (token === null || token === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  function Main() {
    if (isLoggedIn) return <UserDashboard />;
    else return <Layout />;
  }

  return <Main />;
}

export default App;
