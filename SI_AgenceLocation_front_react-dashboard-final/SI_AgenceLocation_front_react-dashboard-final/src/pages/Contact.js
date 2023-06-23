import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

import "../styles/contact.css";



/*const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];*/

const Contact = () => {


  return (
    <Helmet title="Contact">
      <CommonSection title="Trouver une location de voiture pas cher au Maroc" />
    <center className="Mery"> <h2>Location de voitures au Palacio Car - Recherchez et économisez</h2></center> 
    <section>
     <Container >
      <Row className="justify-content-md-center">
       
            <Col> 
            <div className="card">
           <h6 className="card-header ">   
           <button type="button" className="btn btn-success pull-right"> <i className="bi bi-car-front"></i> Nouvelle Réservation</button><span></span>
           <span className="pull-right">Besoin d'une nouvelle réservation ? </span>
           </h6>
           <div className="card-body">
           <h5 className="card-title"></h5>
           <p className="card-text">

          <center>
           <div className="card w-75">
           <div className="card-body">
            <h3 className="card-title">Trouvez votre réservation</h3>
           <p className="card-text"><center>
           <form>
          <div className="form-group">
    
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Driver Email"></input>
             </div>
           <div className="form-group">
          <label for="formGroupExampleInput2"></label>
          <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Numéro de réservation"/>
           </div>
          </form>
            
            
            </center></p>
            <center><Link to="/home"><button className="btn butn" type="submit">RETOUR</button></Link>   <button className="btn butn" type="submit">RECHERCHER</button></center>
         </div>
          </div>
          </center>
           </p>
          
          </div>
         </div>

       
            </Col>
            </Row>
            </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
