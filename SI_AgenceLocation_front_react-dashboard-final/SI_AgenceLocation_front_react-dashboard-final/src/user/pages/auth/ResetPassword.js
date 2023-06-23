import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import axios from "axios";
import { API_BASE_URL } from "constants/constants";

function ResetPassword() {
  const [nouveauPassword, setNouveauPassword] = useState("");
  const [nouveauPasswordError, setNouveauPasswordError] = useState("");

  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [confirmationPasswordError, setConfirmationPasswordError] =
    useState("");

  const [error, setError] = useState("");

  const { token } = useParams();
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const successfulOperation = () => {
    toastRef.current.show({
      severity: "success",
      summary: "Registration Successful",
      detail: "Votre mot de passe a été changé avec succès",
    });
  };

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  );

  function navigateToLogin() {
    navigate("/auth/login");
  }

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
      setError("Le mot de passe et la confirmation ne correspondent pas");
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
        .get(API_BASE_URL + "/auth/reset-password", {
          params: {
            token: token,
            password: nouveauPassword,
          },
        })
        .then((response) => {
          successfulOperation();
          setTimeout(navigateToLogin, 2000);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }

  return (
    <div className={containerClassName}>
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
                className="block text-900 font-medium text-2xl mb-2"
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
                inputClassName="w-full p-3 md:w-50rem h-30 text-2xl"
              ></Password>
              {nouveauPasswordError && (
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
                  {nouveauPasswordError}
                </p>
              )}

              <label
                htmlFor="confirmationPassword"
                className="block text-900 font-medium text-2xl mb-2"
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
                inputClassName="w-full p-3 md:w-50rem h-30 text-2xl"
              ></Password>
              {confirmationPasswordError && (
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
                      fontSize: "15px",
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
                label="Soumettre"
                className="w-full p-3 h-2 text-2xl"
                onClick={handleChangePassword}
                style={{ background: "orange" }}
              ></Button>
              <Toast ref={toastRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
