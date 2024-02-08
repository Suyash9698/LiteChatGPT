// Protected.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isValid = localStorage.getItem("isValid");
    if (location.pathname === "/info") {
        if (!isValid || isValid !== "true") {
            // If not valid, redirect to /valid directly
            navigate("/valid");
        }
    } 

    else if (location.pathname === "/admin") {
        if (!isValid || isValid !== "true") {
            // If not valid, redirect to /valid directly
            navigate("/valid");
        }
    } 

    
    else if (location.pathname !== "/valid" && (!isLoggedIn || isLoggedIn !== "true")) {
        // If not on /valid page and not logged in, redirect to /login
        navigate("/login");
    }
}, [navigate, location.pathname]);

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
