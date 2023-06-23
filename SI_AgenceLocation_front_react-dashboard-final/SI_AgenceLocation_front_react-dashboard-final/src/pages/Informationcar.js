import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

//import { Container, Row, Col } from "reactstrap";
const Informationcar = (props) => {
    const { imgUrl, rating, carName,model, description, speed, price,gps,brand,automatic ,seatType} = props.singleCarItem;
   
  return (
 
    <Card >
      <ListGroup variant="flush">
        <ListGroup.Item style={{ color:'blue',backgroundColor: '#ececec',height:'50px'  , fontWeight: 'bold'}}><h5 style={{ color:'blue', fontWeight: 'bold'}}>GENERAL INFORMATION</h5></ListGroup.Item>
        <ListGroup.Item style={{ height:'150px'}}>
            <i class="bi bi-geo-alt-fill"/>LIEU DE PRISE EN CHARGE
            <br></br>
            <br></br>
            <i class="bi bi-geo-alt-fill"/> LIEU DE RESTITUTION
            <br></br>
            <br></br>
            <Link to="/home"> <button className="btn btn-success pull-right">Modifier</button></Link>
        </ListGroup.Item>
        <ListGroup.Item> <spam style={{ color:'blue'}}> {carName}</spam><br></br>
        Catégorie<br></br>
        <i class="bi bi-person-fill"></i> 2  <spam></spam>
        <i class="bi bi-car-front-fill"></i> 2 <spam></spam>
        <i class="bi bi-briefcase-fill"></i> 1  <spam></spam>
        <i class="bi bi-flower3"></i> Climatisation <br></br>
        <center><img src={imgUrl} alt="" className="w-50" /></center><br></br>
        <button className="btn btn-success pull-right">Modifier</button>
        <br></br>
        <br></br>
        <h3 style={{ color:'black',fontWeight: 'bold'}}><center>DÉTAIL DU TARIF</center></h3>
        <br></br>        


            <spam></spam> Coût De La Location :  <spam className="pull-right">{price} MAD</spam><br></br>
            <spam></spam> Out Of Hours Charge : <spam className="pull-right">{price} MAD</spam><br></br>
            <spam></spam>CDW & TP <spam className="pull-right">Inclus</spam><br></br>
            <spam></spam> Frais D'aéroport <spam className="pull-right">Inclus</spam><br></br>
        
        </ListGroup.Item > 
        <ListGroup.Item  style={{  backgroundColor: '#ececec',height:'190px'}}>
          <center><h5 style={{ color:'black'}}>PRIX TOTAL</h5>
             <h5  style={{ color:'black',fontWeight: 'bold'}}> {price*2} MAD </h5>
             <button type="button" class="btn btn-danger" style={{backgroundColor:'#da1a54',width:'100px'}}>Suivant</button><br></br>
             Un paiement de 200 MAD est nécessaire pour <br></br> confirmer la réservation.
        </center>
      
   </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}
export default  Informationcar;