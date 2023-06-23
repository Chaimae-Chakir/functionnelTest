import React, { useState, useRef } from "react";
import classNames from "classnames";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { API_BASE_URL } from "constants/constants";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");
  const toastRef = useRef(null);

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  );

  function validateForm() {
    let valid = true;

    if (!username.trim()) {
      setUsernameError("Veuillez entrer votre nom d'utilisateur");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!firstName.trim()) {
      setFirstNameError("Veuillez entrer votre prénom");
      valid = false;
    } else {
      setFirstNameError("");
    }
    if (!lastName.trim()) {
      setLastNameError("Veuillez entrer votre nom");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!email.trim()) {
      setEmailError("Veuillez entrer votre email");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Entrer un valide email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!phoneNumber.trim()) {
      setPhoneNumberError("Veuillez entrer votre numéro de téléphone");
      valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError("Veuillez entrer votre numéro de téléphone");
      valid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!password.trim()) {
      setPasswordError("Veuillez entrer votre mot de passe");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Veuillez entrer votre mot de passe");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  }

  function clearForm() {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  }

  function handleSignUp(event) {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form is valid"); // Check if the form is valid

      axios
        .post(API_BASE_URL + "/accounts/register", {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          phoneNumber: phoneNumber,
        })
        .then((data) => {
          console.log("Registration successful"); // Check if the registration is successful
          console.log(data);

          toastRef.current.show({
            severity: "success",
            summary: "Registration Successful",
            detail: "You have successfully registered.",
          });

          // Reset the input fields
          setUsername("");
          setUsernameError("");
          setFirstName("");
          setFirstNameError("");
          setLastName("");
          setLastNameError("");
          setEmail("");
          setEmailError("");
          setPhoneNumber("");
          setPhoneNumberError("");
          setPassword("");
          setPasswordError("");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data.message);
          setError(err.response.data.message);
        });
    } else {
      console.log("Form is invalid"); // Check if the form is invalid
    }
  }

  // function handleSignUp() {
  //   axios
  //     .post("http://localhost:8080/api/accounts/register", {
  //       username: username,
  //       email: email,
  //       firstName: firstName,
  //       lastName: lastName,
  //       password: password,
  //       phoneNumber: phoneNumber,
  //       checked: checked,
  //     })
  //     .then(() => {
  //       history.push("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div className={containerClassName} style={{ marginTop: "25px" }}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            width: "700px",
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, #f1a063 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <img
                src={"assets/layout/images/logo.png"}
                alt="Image"
                height="50"
                className="mb-3"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-900 text-2xl font-medium mb-2"
              >
                Nom d'utilisateur
              </label>
              <InputText
                id="username"
                type="text"
                placeholder=" nom d'utilisateur"
                className="w-full md:w-80rem h-40 mb-5"
                style={{ padding: "1rem", fontSize: "15px" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
              />
              {usernameError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13.5px",
                  }}
                  className="danger"
                >
                  {usernameError}
                </p>
              )}

              <label
                htmlFor="firstName"
                className="block text-900 text-2xl font-medium mb-2"
              >
                Prénom
              </label>
              <InputText
                id="firstName"
                type="text"
                placeholder="prénom"
                className="w-full md:w-80rem h-40 mb-5"
                style={{ padding: "1rem", fontSize: "15px" }}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError("");
                }}
              />
              {firstNameError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13.5px",
                  }}
                  className="danger"
                >
                  {firstNameError}
                </p>
              )}

              <label
                htmlFor="lastName"
                className="block text-900 text-2xl font-medium mb-2"
              >
                Nom
              </label>
              <InputText
                id="lastName"
                type="text"
                placeholder="nom"
                className="w-full md:w-80rem h-40 mb-5"
                style={{ padding: "1rem", fontSize: "15px" }}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError("");
                }}
              />
              {lastNameError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13.5px",
                  }}
                  className="danger"
                >
                  {lastNameError}
                </p>
              )}

              <label
                htmlFor="email"
                className="block text-900 text-2xl font-medium mb-2"
              >
                Email
              </label>
              <InputText
                id="email"
                type="email"
                placeholder="email adresse"
                className="w-full md:w-80rem h-40 mb-5"
                style={{ padding: "1rem", fontSize: "15px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13.5px",
                  }}
                  className="danger"
                >
                  {emailError}
                </p>
              )}

              <label
                htmlFor="phoneNumber"
                className="block text-900 text-2xl font-medium mb-2"
              >
                Numéro de téléphone
              </label>
              <InputText
                id="phoneNumber"
                type="tel"
                placeholder="numéro de téléphone"
                className="w-full md:w-80rem h-40 mb-5"
                style={{ padding: "1rem", fontSize: "15px" }}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setPhoneNumberError("");
                }}
              />
              {phoneNumberError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13.5px",
                  }}
                  className="danger"
                >
                  {phoneNumberError}
                </p>
              )}

              <label
                htmlFor="password"
                className="block text-900 font-medium text-2xl mb-2"
              >
                Mot de passe
              </label>
              <Password
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="mot de passe"
                //className="w-full md:w-80rem h-40 mb-5"
                className="w-full mb-5"
                style={{ fontSize: "50px", width: "200px", height: "90px" }}
                inputClassName="w-full p-3 md:w-80rem h-50 text-2xl"
              ></Password>
              {passwordError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-60px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  className="danger"
                >
                  {passwordError}
                </p>
              )}

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                {/* <div className="flex align-items-center">
                  <Checkbox
                    id="terms"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="terms">
                    I agree to the terms and conditions
                  </label>
                </div> */}
              </div>

              {error && (
                <div className="flex align-items-center justify-content-center mb-5 gap-5">
                  <div
                    className="flex align-items-center"
                    style={{
                      color: "black",
                      textAlign: "center",
                      padding: "5px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      backgroundColor: "red",
                      borderRadius: "5px",
                    }}
                  >
                    {error}
                  </div>
                </div>
              )}

              <Button
                label="S'inscrire"
                className="w-full p-3 text-2xl"
                onClick={handleSignUp}
                style={{ background: "orange", marginTop: "-20px" }}
              ></Button>
              <Toast ref={toastRef} style={{ width: "400px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
