import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Password } from 'primereact/password';

const MyProfile = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("assets/demo/images/galleria/galleria11.jpg");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleUpdate = () => {
    // TODO: Implement update logic using the state variables
  };

  return (
    <div className="grid-container">
      <div className="grid-item-image">
        <Card title="Profile Image">
          <div className="flex justify-content-center">
            <img src={imageUrl} alt="profile" className="profile-img" />
          </div>
          <hr />
          <a href="#/profile" className="upload-link" onClick={() => document.getElementById("fileInput").click()}>
            Télécharger votre photo de profil
          </a>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileSelect} />
        </Card>
      </div>
      <div className="grid-item-profile">
        <Card title="Profile">
          <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-4">
              <label htmlFor="username">Username</label>
              <InputText id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="firstname">Firstname</label>
              <InputText id="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="lastname">Lastname</label>
              <InputText id="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </div>
           
            <div className="field col-12 md:col-4">
              <label htmlFor="email">Email</label>
              <InputText id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="tele">Phone Number</label>
              <InputText id="tele" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="password">Password</label>
              <Password id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem' />
            </div>
          </div>
          <hr />

          <Button label="Update" onClick={handleUpdate} />

        </Card>

      </div>
    </div>
  );
};

export default MyProfile;

