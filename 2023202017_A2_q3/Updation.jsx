import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

function Update() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/update")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  return (
    <div className="container mt-4" style={{ backgroundColor: "black" }}>
      <center>
        <h1>Questions And Answers Repository</h1>
      </center>
      <hr></hr>
      <div className="table-container p-2">
        <table className="table table-bordered table-striped table-custom">
          <thead className="thead-dark">
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  {candidate.questions}{" "}
                  <Link
                    to={`/admin?question=${encodeURIComponent(candidate.questions)}&answer=${encodeURIComponent(candidate.answers)}`}
                  >
                    Edit Question
                  </Link>
                </td>
                <td>
                  {candidate.answers}{" "}
                  <Link
                    to={`/admin?question=${encodeURIComponent(candidate.questions)}&answer=${encodeURIComponent(candidate.answers)}`}
                  >
                    Edit Answer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Update;
