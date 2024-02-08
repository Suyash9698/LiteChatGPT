import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaSignOutAlt,
  FaTrashAlt,
  FaPaperPlane,
  FaUser,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import uimage from "/Users/suyash9698/Downloads/robot.png"; // Replace with the actual path to your image

function Chatbot() {
  const [candidates, setCandidates] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/chatting")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching chatting:");
      });
  }, []);

  const handleQuestionChange = (e) => {
    setSelectedQuestion(e.target.value);
  };

  const handleClearClick = () => {
    setHistory([]);
    toast.success("History cleared successfully");
  };

  const handleEnterClick = (question) => {
    axios
      .get(`http://localhost:3001/getAnswer?question=${question}`)
      .then((response) => {
        const fetchedAnswer = response.data.answer;
        setQuestion(question);
        setAnswer(fetchedAnswer);
        setHistory([...history, { question: question, answer: fetchedAnswer }]);
      })
      .catch((error) => {
        toast.error("Error fetching answer");
      });
  };

  const handleHistoryClick = () => {
    setShowHistoryModal(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleViewProfileClick = () => {};

  const closeUserMenu = () => {
    setShowUserMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (isDarkTheme) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  return (
    <div className={`container mt-4 ${isDarkTheme ? "dark-theme" : ""}`}>
      <ToastContainer />
      <nav
        className="navbar navbar-dark bg-black"
        style={{ borderRadius: "20px", padding: "10px" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="#">
            <center style={{ marginLeft: "450px" }}>TrueGPT</center>
          </a>
          <div className="d-flex">
            <span
              className="navbar-text me-3"
              onClick={handleToggleTheme}
              style={{
                fontSize: "40px",
                cursor: "pointer",
                marginTop: "-8px",
                marginLeft: "60px",
              }}
            >
              {isDarkTheme ? <FaToggleOn /> : <FaToggleOff />}
            </span>
            <span className="navbar-text me-3" style={{ marginTop: "15px" }}>
              <Link
                to="/admin"
                style={{
                  textDecoration: "none",
                  marginLeft: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <strong>Repository</strong>
              </Link>
            </span>
            <span
              className="navbar-text me-3"
              onClick={handleHistoryClick}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "silver",
                cursor: "pointer",
                marginTop: "15px",
                marginLeft: "20px",
              }}
            >
              <strong style={{ color: "white" }}>History</strong>
            </span>
            <span
              className="navbar-text me-3"
              onClick={handleClearClick}
              style={{
                color: "grey",
                fontSize: "20px",
                cursor: "pointer",
                marginTop: "8px",
                marginLeft: "20px",
              }}
            >
              <FaTrashAlt />
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
              <strong>
                <FaSignOutAlt />
              </strong>
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
                      onClick={handleViewProfileClick}
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
                      onClick={handleHistoryClick}
                    >
                      History
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogoutClick}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </span>
          </div>
        </div>
      </nav>
      <hr />
      <div
        style={{
          height: "400px",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
        }}
      >
        <div className="content">
          {question && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div
                className="user-icon"
                style={{
                  backgroundColor: "#7393B3",
                  borderRadius: "50%",
                  height: "70px",
                  width: "70px",
                }}
              >
                <FaUser
                  style={{
                    marginLeft: "14px",
                    marginTop: "12px",
                    fontSize: "42px",
                  }}
                />
              </div>
              <div
                className="alert alert-info"
                style={{ flex: 1, marginLeft: "20px" }}
              >
                <strong>Question:: </strong> {question}
              </div>
            </div>
          )}
          {answer && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div
                className="user-icon"
                style={{
                  backgroundColor: "#7393B3",
                  borderRadius: "50%",
                  height: "70px",
                  width: "70px",
                }}
              >
                <img
                  src={uimage}
                  alt="User Icon"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>

              <div
                className="alert alert-info"
                style={{ flex: 1, marginLeft: "20px" }}
              >
                <strong>Answer:: </strong> {answer}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="container mt-4"
        style={{ backgroundColor: "#E0E0E0", borderRadius: "20px" }}
      >
        <hr />
        <div className="row">
          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="col-md-6"
              style={{
                marginBottom: "10px",
              }}
            >
              <button
                className={`rounded-rectangle ${
                  hoveredIndex === index ? "hovered" : ""
                }`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "70px",
                  padding: "15px",
                  fontSize: "16px",
                  color: "white",
                  backgroundColor:
                    hoveredIndex === index ? "#4682B4" : "#7393B3",
                  borderRadius: "15px",
                  border: "none",
                  outline: "none",
                  borderRadius: "20px",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave()}
                onClick={() => handleEnterClick(candidate.questions)}
              >
                {candidate.questions}
                {hoveredIndex === index && (
                  <FaPaperPlane size={20} style={{ marginLeft: "10px" }} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showHistoryModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">History</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowHistoryModal(false)}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ backgroundColor: "#7393B3" }}
              >
                <ul>
                  {history
                    .filter((item) => item.question && item.answer)
                    .map((item, index) => (
                      <li key={index} className="mb-3">
                        <div className="card">
                          <div
                            className="card-body"
                            style={{ paddingLeft: "10px" }}
                          >
                            <h5
                              className="card-title"
                              style={{ color: "black" }}
                            >
                              Question:
                            </h5>
                            <p
                              className="card-text"
                              style={{ color: "black" }}
                            >
                              {item.question}
                            </p>
                            <h5
                              className="card-title"
                              style={{ color: "black" }}
                            >
                              Answer:
                            </h5>
                            <p
                              className="card-text"
                              style={{ color: "black" }}
                            >
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Chatbot;
