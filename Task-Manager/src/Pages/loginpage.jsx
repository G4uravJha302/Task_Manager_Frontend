import './loginpage.css';
import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [disabled, setDisbled] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: ""
  });
  const [displayOtp, setDisplayOtp] = React.useState(false);

  const navigate = useNavigate();
    
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const otpRef = useRef(null);

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    setDisbled(true);
    console.log("formData:", formData);
    const api = await fetch("https://task-manager-backend-1-kwg8.onrender.com/auth/login", {
      method: "POST",
      headers: {  
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const response = await api.json();
    console.log("response from login:", response.token);
    if (api.ok) {
      console.log("Login successful:", response);
       localStorage.setItem("pendingEmail", formData.email);
      console.log(localStorage.getItem("pendingEmail"), "pending email");
      setDisbled(true);
      setDisplayOtp(true);
    } else {
      const error = await api.json();
      console.error("Login failed:", error);
      setDisbled(false);
      alert(error.message || "Login failed");
    }
  };
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpValue = otpRef.current.value;

        if (!otpValue) {
      alert("Please enter OTP");
      return;
    }

   const api = await fetch("https://task-manager-backend-1-kwg8.onrender.com/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ otp: otpValue, email: localStorage.getItem("pendingEmail") })
    });

    const response = await api.json();
    console.log("response from OTP verification:", response);
    if (api.ok) {
      localStorage.removeItem("pendingEmail");
      localStorage.setItem("token", response.token);
      alert("OTP verified successfully");
      navigate("/dashboard");
    } else {
      alert(response.message || "OTP verification failed");
    }

    setDisbled(false);
    otpRef.current.value = "";
  };

  return (
    <div className="login-page">
      <div className="login-container">
      <h1>Login</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="username" className="username">Username:</label>
          <input type="text" id="username" name="username" ref={emailRef} />
          <label htmlFor="password" className="password">Password:</label>
          <input type="password" id="password" name="password" ref={passwordRef}  autoComplete="off"  />

        <button type="submit" onClick={onSubmitLogin} className="btn" disabled={disabled}>Login</button>
      </div>
    </form>
  </div>
      <div className="otp" style={{ display: displayOtp ? "block" : "none" }}>
          <h2>OTP Verification</h2>
          <p>Enter the OTP sent to your email:</p>
          <input type="text" placeholder="Enter OTP" ref={otpRef} />
          <button className="btn" onClick={onSubmitOtp}>Verify OTP</button>
        </div>
      <div className="login-footer">
          <p>Don't have an account? <a href="signup">Sign Up</a></p>
      </div>
    </div>
  );

}