import React, { useContext, useState } from "react";
import "./Css/ContactPage.css";
import styled from "styled-components";
import { loginRoute, signupRoute } from "./utills/APIroutes";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate()
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
  };

  const loginForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      loginRoute,
      { username, password },
      {
        method: "POST",
        withCredentials: true,
      }
    );

    if (res.data.success === true) {
      const { id, jwt } = res.data;
      const resUsername = res.data.username;
      setUserInfo({ id, jwt, resUsername });
      toast.success(res.data.msg, toastOptions);
      navigate('/createpost')
    }
  };

  const registerForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      signupRoute,
      { username, password, secretKey },
      {
        method: "POST",
        withCredentials: true,
        credentials: "include",
      }
    );
    if (res.data.success === true) {
      toast.success(res.data.msg, toastOptions);
      setShowRegistration(false);
    } else {
      toast.error(res.data.msg, toastOptions);
    }
  };
  return (
    <Container>
      {!showRegistration ? (
        <div className="messageBox">
          <h3>Admin Login</h3>
          <form method="POST">
            <div className="boxes">
              <span>Enter Username :</span>
              <input
                type="text"
                autoComplete="new-password"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="boxes">
              <span>Enter Password :</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={loginForm}>Submit</button>
          </form>
          <p style={{ marginTop: "5px" }}>
            Not an Admin?{" "}
            <span
              style={{ cursor: "pointer", color: "#d92ded" }}
              onClick={() => setShowRegistration(true)}
            >
              Register
            </span>
          </p>
        </div>
      ) : (
        <div className="messageBox">
          <h3>Register As Admin </h3>
          <form method="POST">
            <div className="boxes">
              <span>Enter Secret Key:</span>
              <input
                type="text"
                autoComplete="new-key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
              />
            </div>
            <div className="boxes">
              <span>Enter Username :</span>
              <input
                type="text"
                autoComplete="new-password"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="boxes">
              <span>Enter Password :</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={registerForm}>Submit</button>
          </form>
          <p style={{ marginTop: "5px" }}>
            Already Registerd?{" "}
            <span
              style={{ cursor: "pointer", color: "#d92ded" }}
              onClick={() => setShowRegistration(false)}
            >
              Login
            </span>
          </p>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  .messageBox {
    height: auto !important;
    padding: 3rem !important;
  }
`;

export default Login;
