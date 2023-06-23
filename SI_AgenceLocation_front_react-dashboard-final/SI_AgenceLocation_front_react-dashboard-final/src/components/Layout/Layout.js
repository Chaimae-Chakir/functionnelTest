import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
//import Navbar  from "../navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <Header />
      <Fragment>
        <div>
          <Routers />
        </div>
      </Fragment>

      <Footer />
    </div>
  );
};

export default Layout;
