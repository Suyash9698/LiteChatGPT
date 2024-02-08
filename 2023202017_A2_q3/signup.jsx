import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FaLock, FaUnlock, FaEnvelope, FaUser } from "react-icons/fa"; 

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name,role,email, password })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          // Registration successful
          toast.success("Registered successfully!", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          // Server returned an error, show the error message
          toast.error(result.data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("User already exists with the email id.", {
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
          <div className="user-circle">
            <FaUser style={{ fontSize: '54px' }}/>
          </div>
          <h2>Register</h2>
        </center>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Enter name"
                autoComplete="off"
                name="name"
                className="form-control rounded-0"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="d-flex align-items-center">
             <strong>
                Role
             </strong>
            </label>

          <div className="input-group">
          <span className="input-group-text">
                <FaUser />
              </span>
          <select
           name="role"
           className="form-select rounded-0"
          required
          onChange={(e) => setRole(e.target.value)}
          value={role}
          >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
       </select>
      </div>
    </div>







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
          <button type="submit" className="btn btn-success w-100 link-custom-bg">
            Register
          </button>
        </form>
        <p>Already have an account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 link-custom-bg text-decoration-none"  style={{marginTop:"4px"}}
        >
          Login
        </Link>
        <p><center><i><Link to="/valid">List of Registered Users:</Link></i></center></p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
