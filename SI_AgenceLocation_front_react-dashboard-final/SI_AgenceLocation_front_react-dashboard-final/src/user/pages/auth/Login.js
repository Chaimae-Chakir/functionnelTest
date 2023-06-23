import React, { useState, useRef } from "react";
import axios from "axios";
import classNames from "classnames";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "constants/constants";
import SessionService from "user/service/SessionService";
import { isLoggin, updateIsLoggin } from "../../../globals";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  );

  const toastRef = useRef(null);

  const successfulLogin = () => {
    toastRef.current.show({
      severity: "success",
      summary: "Registration Successful",
      detail: "Vous êtes connecté avec succès",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Veuillez entrer votre nom d'utilisateur");
    } else if (!username) {
      setUsernameError("Veuillez entrer votre nom d'utilisateur");
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Veuillez entrer votre mot de passe");
    } else {
      setPasswordError("");
    }

    if (username && password) {
      axios
        .post(API_BASE_URL + "/auth/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          successfulLogin();
          console.log(response);
          SessionService.setToken(response.data.accessToken);
          SessionService.setRole(response.data.role[0]);
          const user_infos = SessionService.userInfos(
            response.data.firstName,
            response.data.lastName,
            response.data.username,
            response.data.email,
            response.data.id
          );
          SessionService.setUserInfos(user_infos);
          updateIsLoggin(true);
          console.log(isLoggin);
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
  };

  // function handleLogin() {
  //   history.push("/");
  // }

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            width: "500px",
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
                src={`assets/demo/images/avatar/logo.png`}
                alt="Image"
                height="50"
                className="mb-3"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-900 text-2xl font-medium mb-2"
              >
                Username
              </label>
              <InputText
                // inputId="emailinput"
                type="text"
                placeholder="Username"
                className="w-full md:w-60rem mb-5"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
                style={{ padding: "1.05rem", fontSize: "15px" }}
              />
              {usernameError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13px",
                    marginLeft: "2px",
                  }}
                  className="text-red-600"
                >
                  {usernameError}
                </p>
              )}

              <label
                htmlFor="password"
                className="block text-900 font-medium text-2xl mb-2"
              >
                Password
              </label>
              <Password
                inputId="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Password"
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-60rem text-2xl"
              ></Password>
              {passwordError && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "13px",
                    marginTop: "-15px",
                    fontWeight: "bold",
                    fontSize: "13px",
                    marginLeft: "2px",
                  }}
                  className="text-red-600"
                >
                  {passwordError}
                </p>
              )}

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberme"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="rememberme" style={{ fontSize: "15px" }}>
                    Remember me
                  </label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{
                    color: "orange",
                    fontSize: "15px",
                    marginRight: "3px",
                  }}
                >
                  Forgot password?
                </Link>
              </div>

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
                label="S'identifier"
                className="w-full p-3 text-2xl"
                onClick={handleLogin}
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

export default LoginPage;
