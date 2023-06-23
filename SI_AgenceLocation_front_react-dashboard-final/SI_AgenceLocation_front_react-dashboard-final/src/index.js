import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserDashboard from "./user/UserDashboard";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { isLoggin } from "./globals";
//import SessionService from "user/service/SessionService";

//const isLoggedIn = SessionService.getToken !== null ? true : false;
// function Main() {
//   if (isLoggin) {
//     return <UserDashboard />;
//   } else {
//     return <App />;
//   }
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>
  // </React.StrictMode>
);

reportWebVitals();
