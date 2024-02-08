import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import "./style.css"; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function Information() {
  const [candidates, setCandidates] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    axios.get("http://localhost:3001/candidates") // Replace with your API endpoint
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Implement your logout logic here
    // Example: clear user session or token
    // Redirect the user to the login page
    window.location.href = "/login";
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeUserMenu = () => {
    setShowUserMenu(false);
  };

  return (
    <div>
      {/* Navbar */}
      <center>
        <nav className="navbar navbar-dark bg-black" style={{ borderRadius: "20px", padding: "20px", width: "92%", marginTop: "30px", height: "90px" }}>
          <div className="container-fluid">
            <a className="navbar-brand mx-auto" href="#">
              <center style={{ marginLeft: "250px" }}><h2>TrueGPT</h2></center>
            </a>
            <div className="d-flex">
              <span className="navbar-text me-3" style={{ marginTop: "7px" }}>
                <Link to="/admin" style={{ textDecoration: "none", color: "white", cursor: "pointer" }}>
                  <strong style={{ fontSize: "20px" }}>Repository</strong>
                </Link>
              </span>
              <span
                className="navbar-text me-3"
                onClick={handleLogoutClick}
                style={{
                  color: "red",
                  fontSize: "20px",
                  marginTop: "8px",
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
              >
                <FaSignOutAlt />
              </span>
              <span
                style={{
                  marginLeft: "20px",
                  borderRadius: "50%",
                  marginTop: "7px",
                }}
              >
                <div className="btn-group" ref={userMenuRef}>
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={handleUserMenuClick}
                  >
                    <FaUser style={{ fontSize: "24px" }} />
                  </button>
                  <ul
                    className={`dropdown-menu ${showUserMenu ? "show" : ""}`}
                    style={{ marginTop: "50px", backgroundColor: "#D0D0D0" }}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={closeUserMenu}
                      >
                        <Link
                          to="/profile"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                        >
                          View Profile
                        </Link>
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
          </div>
        </nav>
      </center>

      {/* Main content */}
      <div className="container mt-4" style={{ backgroundColor: "black" }}>
        <h4 style={{ paddingLeft: "15px", paddingTop: "15px" }}>Registered Users</h4>
        <hr></hr>
        <div className="table-container p-2">
          {/* Table goes here */}
          <table className="table table-bordered table-striped table-custom">
            <thead className="thead-dark">
              <tr>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.email}</td>
                  <td>{candidate.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirmLogout}>
            Logout
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Information;
