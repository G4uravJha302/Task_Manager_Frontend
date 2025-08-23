import { use, useRef, useState } from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [disbled, setDisbled] = useState(false);

  const [displayOtp, setDisplayOtp] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const otpRef = useRef(null);

  const navigate = useNavigate();

  const onSubmitData = async (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!formData.email.includes("@") || formData.password.length < 6) {
      alert("Please provide a valid email and password");
      return;
    }

    setDisbled(true);
    const api = await fetch("https://task-manager-backend-1-kwg8.onrender.com/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    const response = await api.json();
    if (api.ok) {
      localStorage.setItem("pendingEmail", formData.email);
      console.log(localStorage.getItem("pendingEmail"), "pending email");
      setDisbled(true);
      setDisplayOtp(true);
    } else {
      alert(response.message || "Registration failed");
    }
    setDisbled(false);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        otp: otpValue,
        email: localStorage.getItem("pendingEmail"),
      }),
      credentials: "include"
    });

    const response = await api.json();
    console.log("OTP response", response.token);

    if (api.ok) {
      localStorage.removeItem("pendingEmail");
      cookieStore.set("token", response.token);
      alert("OTP verified successfully");
      navigate("/dashboard");
    } else {
      alert(response.message || "OTP verification failed");
    }

    setDisbled(false);
    otpRef.current.value = "";
  };

  return (
    <div className="page-center-wrapper">
      <div className="login-container registration-container">
        <h1>Registration</h1>
        <form action="" style={{ display: displayOtp ? "none" : "block" }}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              ref={nameRef}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              ref={emailRef}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              ref={passwordRef}
              placeholder="Enter your password"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="btn"
            onClick={onSubmitData}
            disabled={disbled}
          >
            Register
          </button>
        </form>

        <div className="otp" style={{ display: displayOtp ? "block" : "none" }}>
          <h2>OTP Verification</h2>
          <p>Enter the OTP sent to your email:</p>
          <input type="text" placeholder="Enter OTP" ref={otpRef} />
          <button className="btn" onClick={onSubmitOtp}>
            Verify OTP
          </button>
        </div>
        <div className="login-footer">
          <p>
            Already have an account? <a href="login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
