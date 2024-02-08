import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FaLock, FaUnlock, FaEnvelope, FaUser } from "react-icons/fa";

function Validation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/valid", { email, password })
      .then((result) => {
        const { success, message } = result.data;

        if (success) {
          toast.success(message, {
            position: "top-center",
            autoClose: 3000,
          });

          // Set the isValid flag in localStorage when validation succeeds
          localStorage.setItem("isValid", "true");

          setTimeout(() => {
            navigate("/info");
          }, 2000);
        } else {
          toast.error(message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred while validation!.", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-black p-3 rounded-20 w-25">
        <center>
          <h4>Please Verify Your Identity</h4>
        </center>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                autoComplete="off"
                className="form-control rounded-0"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text" onClick={togglePasswordVisibility}>
                {showPassword ? <FaUnlock /> : <FaLock />}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                autoComplete="off"
                className="form-control rounded-0"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Proceed
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Validation;
