import React, { useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import image from './Screenshot_4-removebg-preview.png';

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/contact",
    display: "Gérer Ma Réservation",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  /* {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },*/
];

function Header() {
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const register = () => {
    // Add your registration logic here
    console.log("Register button clicked");
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
     
      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col>
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="bi bi-globe-europe-africa"></i>
                </span>
                <div className="header__location-content">
                  <h4>Maroc</h4>
                  <h6>Berrchid</h6>
                </div>
              </div>
            </Col>

            <Col>
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <img src={image} height="70px" alt="Logo" />
                  </Link>
                </h1>
              </div>
            </Col>
            
            <Col>
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="bi bi-clock-history"></i>
                </span>
                <div className="header__location-content">
                  <h4>Lundi -- Samedi</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>
            
            <Col className="d-flex align-items-center justify-content-end">
              <Link to="/contact">
                <button type="button" className="btn btn-success mr-2">
                  <i className="bi bi-calendar2-check"></i> Gérer votre Réservation
                </button>
              </Link>

              <button type="button" className="btn btn-primary" onClick={register}>
                Register
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Header;