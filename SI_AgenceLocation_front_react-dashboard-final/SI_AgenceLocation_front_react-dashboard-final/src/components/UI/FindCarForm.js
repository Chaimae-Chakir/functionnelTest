import React from "react";
import { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
const FindCarForm = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState(new Date().toISOString().slice(0, 16)); // initialiser la date de départ avec la date actuelle
  const [returnDateTime, setReturnDateTime] = useState(new Date(new Date().getTime() + 86400000).toISOString().slice(0, 16)); // initialiser la date de retour avec la date de départ incrémentée d'un jour
  
  const [isReturnDifferent, setIsReturnDifferent] = useState(true);
  const [age, setAge] = useState("23");

  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
    setIsReturnDifferent(false);
  };

  const handleReturnLocationChange = (event) => {
    setReturnLocation(event.target.value);
  };

  const handlePickupDateTimeChange = (event) => {
    const newPickupDateTime = event.target.value;
    setPickupDateTime(newPickupDateTime);
    const newReturnDateTime = calculateReturnDateTime(newPickupDateTime);
    setReturnDateTime(newReturnDateTime);
  };

  const handleReturnDateTimeChange = (event) => {
    const newReturnDateTime = event.target.value;
    setReturnDateTime(newReturnDateTime);
    const newPickupDateTime = calculatePickupDateTime(newReturnDateTime);
    setPickupDateTime(newPickupDateTime);
  };
  const calculateReturnDateTime = (pickup) => {
    return new Date(new Date(pickup).getTime() + 86400000).toISOString().slice(0, 16);
  };
  const calculatePickupDateTime = (returnDate) => {
    return new Date(new Date(returnDate).getTime() - 86400000).toISOString().slice(0, 16);
  };

  const handleReturnDifferentChange = (event) => {
    setIsReturnDifferent(event.target.checked);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajouter le code pour envoyer la réservation
  };
  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
        <label htmlFor="pickupLocation">Lieu de prise en charge :</label>
        <input
          type="text"
          id="pickupLocation"
          name="pickupLocation"
          value={pickupLocation}
          onChange={handlePickupLocationChange}
        />
       <label htmlFor="returnDifferent">Lieu de restitution différente ?</label>
        <input
          type="checkbox"
          id="returnDifferent"
          name="returnDifferent"
          checked={isReturnDifferent}
          onChange={handleReturnDifferentChange}
        />
 
        {isReturnDifferent && (
      <div>
        <label htmlFor="returnLocation">Lieu de restitution :</label>
        <input
          type="text"
          id="returnLocation"
          name="returnLocation"
          value={returnLocation}
          onChange={handleReturnLocationChange}
        />
      </div>
    )}
        </FormGroup>
        <FormGroup className="form__group">
        
        <label htmlFor="pickupDateTime">Date de départ :</label>
        <input
          type="datetime-local"
          id="pickupDateTime"
          name="pickupDateTime"
          value={pickupDateTime}
          onChange={handlePickupDateTimeChange}
        />
      
      
      <div>
        <label htmlFor="returnDateTime">Date de retour :</label>
        <input
          type="datetime-local"
          id="returnDateTime"
          name="returnDateTime"
          value={returnDateTime}
          onChange={handleReturnDateTimeChange}
        />
      </div>
      <div>
        <label htmlFor="age">Age :</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={handleAgeChange}
        />
      </div>
        </FormGroup>
        <FormGroup className="select__group">
        <Link to='/Recherche-Cars'><button className="btn find__car-btn" type="submit">Rechercher</button></Link>  
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
