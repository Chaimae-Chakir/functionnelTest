import React from 'react'

import { Container, Row, Col } from "reactstrap";
 function Dealoptions() {
  return (
        <Container>
             <Row  style={{height: '80px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}> 
             <Col style={{textAlign:'center'}}>
              <br></br>
                   <h2 style={{color:'#192266',  fontWeight:'bolder'}}><span> Trouver une location de voiture pas cher au Maroc</span></h2>
              <br></br>
              </Col>
             </Row>
            <Row style={{height: '80px'}}>
                <Col style={{textAlign:'center'}}> 
            <br></br>
            <br></br>
            <div className='liner-containe'>
            <h4 style={{color:'#192266',  fontWeight:'bolder'}}> 
            Location de voitures au Palacio Car - Recherchez et économisez
            </h4></div>
            <br></br>
            </Col>
            </Row>
          
        </Container>
        
   
   ) 
}
export default Dealoptions;