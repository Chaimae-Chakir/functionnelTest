import React, { useState } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import axios from "axios";
import { API_BASE_URL } from "constants/constants";
import { headerConfig } from "Authorization/HeaderConfig";

function ChangePassword() {
  const [nouveauPassword, setNouveauPassword] = useState("");
  const [nouveauPasswordError, setNouveauPasswordError] = useState("");

  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [confirmationPasswordError, setConfirmationPasswordError] =
    useState("");

  const [error, setError] = useState("");

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  );

  function validateForm() {
    let valid = true;

    if (!nouveauPassword.trim()) {
      setNouveauPasswordError("Veuillez entrer votre nouveau mot de passe");
      valid = false;
    } else if (nouveauPassword.length < 6) {
      setNouveauPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères"
      );
      valid = false;
    } else {
      setNouveauPasswordError("");
    }

    if (!confirmationPassword.trim()) {
      setConfirmationPasswordError(
        "Veuillez entrer votre nouveau mot de passe pour confirmation"
      );
      valid = false;
    } else if (nouveauPassword.length < 6) {
      setConfirmationPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères"
      );
      valid = false;
    } else {
      setConfirmationPasswordError("");
    }

    if (nouveauPassword !== confirmationPassword) {
      setError(
        "Les entrées de mot de passe et de confirmation ne correspondent pas. Veuillez réessayer."
      );
      valid = true;
    } else {
      setError("");
    }

    return valid;
  }

  function handleChangePassword(event) {
    event.preventDefault();

    if (validateForm()) {
      axios
        .post(
          API_BASE_URL + "/accounts/change-password-first-time",
          {
            username: "Amar88",
            newPassword: nouveauPassword,
          },
          headerConfig
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }

  return (
    <div className={containerClassName}>
      <Button
        label="se déconnecter"
        className="p-3 h-2 text-xl"
        style={{
          background: "orange",
          position: "relative",
          left: "900px",
          bottom: "300px",
        }}
      ></Button>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            width: "550px",
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, #f1a063 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px", height: "400px" }}
          >
            <div className="text-center mb-5">
              <img
                src={`assets/demo/images/avatar/logo.png`}
                alt="Image"
                height="50"
                className="mb-3"
              />
            </div>

            <div>
              <label
                htmlFor="nouveauPassword"
                className="block text-900 font-medium text-xl mb-2"
              >
                Nouveau mot de passe
              </label>
              <Password
                id="nouveauPassword"
                value={nouveauPassword}
                onChange={(e) => {
                  setNouveauPassword(e.target.value);
                  setNouveauPasswordError("");
                  setError("");
                }}
                placeholder="nouveau mot de passe"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-50rem h-30"
              ></Password>
              {nouveauPasswordError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "11px",
                  }}
                  className="danger"
                >
                  {nouveauPasswordError}
                </p>
              )}

              <label
                htmlFor="confirmationPassword"
                className="block text-900 font-medium text-xl mb-2"
              >
                Confirmation de nouveau mot de passe
              </label>
              <Password
                id="confirmationPassword"
                value={confirmationPassword}
                onChange={(e) => {
                  setConfirmationPassword(e.target.value);
                  setConfirmationPasswordError("");
                  setError("");
                }}
                placeholder="confirmation de nouveau mot de passe"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-50rem h-30"
              ></Password>
              {confirmationPasswordError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "11px",
                  }}
                  className="danger"
                >
                  {confirmationPasswordError}
                </p>
              )}

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
                label="Submit"
                className="w-full p-3 h-2 text-xl"
                onClick={handleChangePassword}
                style={{ background: "orange" }}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
