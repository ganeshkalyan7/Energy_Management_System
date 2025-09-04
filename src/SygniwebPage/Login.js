import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import SygniDashboard from "./SygniDashboard";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Email, setEmail] = useState("BK111");
  const [Password, setPassword] = useState("123456");
  const checkemail = "BK111";
  const checkpassword = "123456";

  const navigate = useNavigate();

  const Loginfunction = () => {
    if (Email === checkemail && Password === checkpassword) {
      console.log("login successfull");
      navigate("/Cygni/Dashboard"); // redirect to dashboard
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.logincard}>
        {/* <h1>login</h1> */}
        <lable>Login ID</lable>
        <input
          type="text"
          value={checkemail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <lable>Password</lable>
        <input
          type="password"
          value={checkpassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={Loginfunction}>Login</button>
      </div>
    </div>
  );
}

export default Login;
