import React, { useRef, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Modal, Button, Form } from "reactstrap";
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
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    nomCl: "",
    prenom: "",
    email: "",
    cin: "",
    tel: "",
    adresse: "",
  });

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const toggleRegisterModal = () => {
    setRegisterModalOpen(!isRegisterModalOpen);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/clients/create/",
        registrationForm
      );

      const responseData = response.data;
      console.log("Registration successful:", responseData);
      toggleRegisterModal(); // Close the modal after registration

      // You can perform additional actions here based on the response

    } catch (error) {
      console.error("Registration error:", error);
      // Handle the error condition, show a message, etc.
    }
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
                <button type="button" className="btn btn-success">
                  <i className="bi bi-calendar2-check"></i> Gérer votre Réservation
                </button>
              </Link>
              
              <button type="button" className="btn btn-primary ml-2" onClick={toggleRegisterModal}>
                Register
              </button>
              
              <Link to="/auth/login">
              <button type="button" className="btn btn-success">
                  <i className="bi bi-calendar2-check"></i> Login
                </button>
              </Link>
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
      

      <Modal isOpen={isRegisterModalOpen} toggle={toggleRegisterModal}>
      <Form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h5 className="modal-title">Register</h5>
          <button type="button" className="close" onClick={toggleRegisterModal}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="nomCl">Nom</label>
            <input
              type="text"
              className="form-control"
              id="nomCl"
              name="nomCl"
              value={registrationForm.nomCl}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              name="prenom"
              value={registrationForm.prenom}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={registrationForm.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cin">CIN</label>
            <input
              type="text"
              className="form-control"
              id="cin"
              name="cin"
              value={registrationForm.cin}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tel">Téléphone</label>
            <input
              type="text"
              className="form-control"
              id="tel"
              name="tel"
              value={registrationForm.tel}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              className="form-control"
              id="adresse"
              name="adresse"
              value={registrationForm.adresse}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="submit">
            Register
          </Button>
          <Button color="secondary" onClick={toggleRegisterModal}>
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
    </header>
  );
}

export default Header;