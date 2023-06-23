import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FindCarForm from '../components/UI/FindCarForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faMoneyCheckDollar , faFilter,  faExclamationCircle, faUser} from "@fortawesome/free-solid-svg-icons";

const cars = [
  {
    id: 1,
    category: "Mini",
    passengers: 4,
    model: "Ford Focus",
    price: "3000",
    image: "https://carstreetindia.com/blogs/wp-content/uploads/2022/09/2018-rolls-royce-phantom-1536152159.png",
  },
  {
    id: 2,
    category: "Eco+",
    passengers: 6,
    model: "Toyota Highlander",
    price: "6500",
    image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg",
  },
  {
    id: 3,
    category: "Luxury",
    passengers: 2,
    model: "BMW 7 Series",
    price: "5000",
    image: "https://images.pexels.com/photos/225841/pexels-photo-225841.jpeg",
  },
  {
    id: 4,
    category: "Mini",
    passengers: 5,
    model: "Honda Civic",
    price: "40000",
    image: "https://images.pexels.com/photos/13627439/pexels-photo-13627439.jpeg",
  },
 
];

const RechercheCars = () => {
  const [filter, setFilter] = useState({
    category: "",
    passengers: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleCategoryFilter = (category) => {
    setFilter({ ...filter, category });
  };

  const filteredCars = cars.filter((car) => {
    return (
      (filter.category === "" || car.category === filter.category) &&
      (filter.passengers === "" || car.passengers === parseInt(filter.passengers))
    );
  });
 
  return (
    <>
     <br></br> 
    <div style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px', 
    marginLeft:'200px',width:'70%'}}>
      <FindCarForm /> 

    </div>
     
        <br></br>  <br></br> <br></br>   
    <Container fluid>      
      <Row>
        <Col xs={12} md={3} className="mb-3" 
        style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
          <span><br/></span>
          <h5><FontAwesomeIcon icon={faFilter} className="ml-2"/> Filtres</h5>
          <br/>
          <Form>
            <Form.Check
              type="checkbox"
              id=""
              label="All"
              name="passengers"
              value=""
              checked={filter.passengers === ""}
              onChange={handleFilterChange}
            />
            <Form.Check
              type="checkbox"
              id="2-passengers"
              label="1 - 2 Passagers"
              name="passengers"
              value="2"
              checked={filter.passengers === "1 - 2 Passagers"}
              onChange={handleFilterChange}
            />
            <Form.Check
              type="checkbox"
              id="5-passengers"
              label="3 - 5 Passagers"
              name="passengers"
              value="5"
              checked={filter.passengers === "5"}
              onChange={handleFilterChange}
            />
            <Form.Check
              type="checkbox"
              id="6-passengers"
              label="6 et plus"
              name="passengers"
              value="6"
              checked={filter.passengers === "7"}
              onChange={handleFilterChange}
            />
          </Form>
          
        </Col>
        
        <Col xs={12} md={9}>
        <Col xs={12} md={8}>
          <Button
            variant={filter.category === "" ? "dark" : "outline-secondary"}
            onClick={() => handleCategoryFilter("")}
            className="me-2 mb-2"
          >
            All Categories
          </Button>
          <Button
            variant={
              filter.category === "Economy" ? "dark" : "outline-secondary"
            }
            onClick={() => handleCategoryFilter("Economy")}
            className="me-2 mb-2"
          >
           Economy
          </Button>
          <Button
            variant={filter.category === "Eco+" ? "dark" : "outline-secondary"}
            onClick={() => handleCategoryFilter("Eco+")}
            className="me-2 mb-2"
          >
            Eco+
          </Button>
          <Button
            variant={
              filter.category === "Luxury" ? "dark" : "outline-secondary"
            }
            onClick={() => handleCategoryFilter("Luxury")}
            className="me-2 mb-2"
          >
            Luxury
          </Button>
          <Button
            variant={
              filter.category === "Mini" ? "dark" : "outline-secondary"
            }
            onClick={() => handleCategoryFilter("Mini")}
            className="me-2 mb-2"
          >
            Mini
          </Button>
          <Button
            variant={
              filter.category === "Full-size" ? "dark" : "outline-secondary"
            }
            onClick={() => handleCategoryFilter("Full-size")}
            className="me-2 mb-2"
          >
            Full-size
          </Button>
          <Button
            variant={
              filter.category === "SUV GRAND" ? "dark" : "outline-secondary"
            }
            onClick={() => handleCategoryFilter("SUV GRAND")}
            className="me-2 mb-2"
          >
            SUV GRAND
          </Button>
        </Col>
        <br></br>
          <Row>
            {filteredCars.map((car) => (
              <Col xs={12} sm={6} md={4} key={car.id} className="mb-4">
                <Card style={{ width: '18rem' , height: '100%', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                  <Card.Img style={{ height: "200px" }} variant="top" src={car.image} />
                  <Card.Body>
                    <Card.Title><strong>{car.model} </strong>  
                    <FontAwesomeIcon icon={faExclamationCircle} className="ml-2" style={{color:'#1E90FF'}}/> ou similaire <i> Disponible</i>
                    </Card.Title>
                    <Card.Text><FontAwesomeIcon  icon={faCar} className="ml-2" /><span> </span>
                      Catégorie {car.category} - <FontAwesomeIcon  icon={faUser} className="ml-2" /> {car.passengers} Places</Card.Text>
                   
                    <Card.Text> <FontAwesomeIcon icon={faMoneyCheckDollar} className="ml-2" />  <span> </span>
                      Prix: {car.price} MAD /jour</Card.Text>
                    <Link to={`/cars/${car.id}`} className="btn btn-primary" style={{backgroundColor:'#1E90FF', border:'none'}}> Réserver</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
            }
            export default RechercheCars;  