import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FaUser, FaUndo, FaSignOutAlt } from "react-icons/fa";
import uimage from "/Users/suyash9698/Desktop/f.jpg"; // Replace with the actual path to your image
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap

function Admin() {
  const [questions, setQuestion] = useState("");
  const [answers, setAnswer] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleQuestionReset = () => {
    setQuestion("");
    localStorage.removeItem("admin_question");
  };

  const handleAnswerReset = () => {
    setAnswer("");
    localStorage.removeItem("admin_answer");
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const questionParam = searchParams.get("question");
    const answerParam = searchParams.get("answer");
    const savedQuestion = localStorage.getItem("admin_question");
    const savedAnswer = localStorage.getItem("admin_answer");

    setQuestion(questionParam || savedQuestion || "");
    setAnswer(answerParam || savedAnswer || "");
  }, [location.search]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:3001/checkQuestion?question=${questions}`)
      .then((response) => {
        const questionExists = response.data.exists;

        if (questionExists) {
          axios
            .put("http://localhost:3001/updateQuestion", {
              question: questions,
              answer: answers,
            })
            .then((result) => {
              if (result.status === 200) {
                toast.success("Updated successfully!", {
                  position: "top-center",
                  autoClose: 3000,
                });
              } else {
                toast.error("Update failed", {
                  position: "top-center",
                  autoClose: 3000,
                });
              }
            })
            .catch((error) => {
              console.error("Error updating question and answer", error);
              toast.error("Update failed", {
                position: "top-center",
                autoClose: 3000,
              });
            });
        } else {
          axios
            .post("http://localhost:3001/admin", { questions, answers })
            .then((result) => {
              if (result.status === 200) {
                toast.success("Submitted successfully!", {
                  position: "top-center",
                  autoClose: 3000,
                });
                localStorage.removeItem("admin_question");
                localStorage.removeItem("admin_answer");
              } else {
                toast.error(result.data.message, {
                  position: "top-center",
                  autoClose: 3000,
                });
              }
            })
            .catch((err) => {
              console.error("Error creating a new record", err);
              toast.error("Error creating a new record", {
                position: "top-center",
                autoClose: 3000,
              });
            });
        }
      })
      .catch((error) => {
        console.error("Error checking if the question exists", error);
        toast.error("Error checking if the question exists", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    localStorage.setItem("admin_question", questions);
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("admin_answer", answers);
  }, [answers]);

  return (
    <div>
      {/* Navbar */}
      <center>
        <nav className="navbar navbar-dark bg-black" style={{ borderRadius: "20px", padding: "20px", width: "100%", marginTop: "30px", height: "90px" }}>
          <div className="container-fluid">
            <a className="navbar-brand mx-auto" href="#">
              <center style={{ marginLeft: "250px" }}><h2>TrueGPT</h2></center>
            </a>
            <div className="d-flex">
              
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
                    style={{ marginTop: "50px", backgroundColor: "#D0D0D0",marginLeft:"-10px" }}
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
      <div className="bg-secondary vh-100">
        <div className="bg-black p-5 rounded-20 w-100 h-100" style={{ width: "100%", height: "100%", backgroundImage: `url(${uimage})`, backgroundSize: "cover", marginTop: "10px" }}>
          <center>
            <div className="user-circle">
              <FaUser style={{ fontSize: '44px' }} />
            </div>
            <h2>Admin Panel</h2>
          </center>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="question">
                <strong>Question:</strong>
                <button
                  type="button"
                  className="btn btn-warning rounded-circle reset-button"
                  onClick={handleQuestionReset}
                  style={{
                    backgroundColor: "lightgrey",
                    fontSize: "7px",
                    marginLeft: "1px",
                    border: "none",
                  }}
                >
                  <FaUndo className="undo-icon" />
                </button>
              </label>
              <div className="input-group">
                <textarea
                  placeholder="Enter question...."
                  style={{ height: '80px', backgroundColor: "lightgrey" }}
                  autoComplete="off"
                  name="questions"
                  className="form-control rounded-0"
                  required
                  value={questions}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="answer">
                <strong>Answer:</strong>
                <button
                  type="button"
                  className="btn btn-warning rounded-circle reset-button"
                  onClick={handleAnswerReset}
                  style={{
                    backgroundColor: "lightgrey",
                    fontSize: "7px",
                    marginLeft: "1px",
                    border: "none",
                  }}
                >
                  <FaUndo className="undo-icon" />
                </button>
              </label>
              <div className="input-group">
                <textarea
                  placeholder="Enter Answer...."
                  style={{ height: '120px', backgroundColor: "lightgrey" }}
                  name="answers"
                  autoComplete="off"
                  className="form-control rounded-0"
                  required
                  value={answers}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            </div>
            <center>
              <button type="submit" className="btn btn-success w-25 link-custom-bg">
                Submit
              </button>
            </center>
          </form>
          <p><center><i><Link to="/update">Update Existing Questions Or Answers:</Link></i></center></p>
        </div>
      </div>
      <ToastContainer />
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

export default Admin;
