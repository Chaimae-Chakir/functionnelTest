import React, { useEffect } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import Dealoptions from "../components/UI/Dealoptions";
import Choixsupplémentaire from "../components/UI/Choixsupplémentaire";
import Informationcar from "./Informationcar";


const CarDetails = () => {
  const { slug } = useParams();
 
  const singleCarItem = carData.find((item) => item.carName === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Dealoptions/> 
        <br></br>
        <Container style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>

        <br></br>
        <div className="card w-100">
       <div className="card-body">
       <h5 className="card-title"></h5>
       <p className="card-text">
       <Row>
       <Col>
       <Choixsupplémentaire/>
        </Col>
       <Col>
       
        <Informationcar  singleCarItem={singleCarItem} />  
        
     
       </Col>
       </Row>
       </p>
       
      </div>
      </div>
      <br></br>
     
   </Container>
   </section>
    </Helmet>
  );
};

export default CarDetails;
