import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const userEmail = localStorage.getItem("usermail"); // Retrieve user's email from localStorage

  useEffect(() => {
    if (!userEmail) {
      // If user email is not found in localStorage, handle accordingly (e.g., redirect to login)
      // You can add your own logic here.
      return;
    }

    // Make an API request to get the user's data based on the email
    axios
      .get(`http://localhost:3001/currentUser?email=${userEmail}`)
      .then((response) => {
        const userData = response.data;
        setUserData(userData);
        console.log(userData);
        setEditedUserData(userData); // Initialize editedUserData with user data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userEmail]); // Include userEmail in the dependency array

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // Make an API request to update the user's data
    axios
      .put(`http://localhost:3001/updateData?email=${userData.email}`, editedUserData)
      .then((response) => {
        const updatedUserData = response.data;
        setUserData(updatedUserData);
        setEditMode(false);

        // Show success toast
        toast.success("User data updated successfully", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);

        // Show error toast
        toast.error("Error updating user data", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <center>
        <h1 style={{ color: "#FF3131", fontFamily: "serif" }}>USER PROFILE</h1>
      </center>
      {userData ? (
        <div className="user-profile" style={{ width: "600px", margin: "auto" }}>
          <div
            className="image-div"
            style={{
              width: "600px",
              height: "300px",
              marginTop: "40px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
            }}
          >
            <center>
              <div className="user-circle" style={{ width: "150px", height: "150px" }}>
                <FaUser style={{ fontSize: "84px" }} />
              </div>

              <h1 style={{ marginTop: "-10px" }}> Hey! {userData.name}</h1>
            </center>
            {editMode ? null : (
              <center>
                <button
                  onClick={handleEdit}
                  className="btn btn-primary"
                  style={{ backgroundColor: "green", marginTop: "5px", marginBottom: "15px" }}
                >
                  Edit Details
                </button>
              </center>
            )}
          </div>
          <div
            className="info-div"
            style={{
              border: "2px solid black",
              borderRadius: "30px",
              backgroundColor: "#D8D8D8",
              padding: "20px",
              marginTop: "-50px",
              height: "auto",
            }}
          >
            {editMode ? (
              <div className="edit-profile">
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedUserData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ border: "none", borderBottom: "1px solid #ccc" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={editedUserData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    disabled
                    style={{ border: "none", borderBottom: "1px solid #ccc" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={editedUserData.role}
                    onChange={handleInputChange}
                    className="form-control"
                    disabled
                    style={{ border: "none", outline: "none", borderBottom: "1px solid #ccc" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    value={editedUserData.password}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ border: "none", borderBottom: "1px solid #ccc" }}
                  />
                </div>
                {/* You can add inputs for other user details */}
              </div>
            ) : (
              <div className="view-profile">
                <div className="mb-3">
                  <p className="mb-0">
                    {" "}
                    <strong style={{ color: "black" }}>Name: </strong>
                    <label style={{ color: "#36454F", marginLeft: "12px" }}>{userData.name}</label>
                  </p>
                </div>
                <hr style={{ border: "1px solid grey" }} />
                <div className="mb-3">
                  <p className="mb-0">
                    {" "}
                    <strong style={{ color: "black" }}>Email:</strong>
                    <label style={{ color: "#36454F", marginLeft: "12px" }}> {userData.email}</label>
                  </p>
                </div>
                <hr style={{ border: "1px solid grey" }} />
                <div className="mb-3">
                  <p className="mb-0">
                    <strong style={{ color: "black" }}>Role:</strong>
                    <label style={{ color: "#36454F", marginLeft: "12px" }}>{userData.role}</label>
                  </p>
                </div>
                <hr style={{ border: "1px solid grey" }} />
                <div className="mb-3">
                  <p className="mb-0">
                    <strong style={{ color: "black" }}>Password:</strong>
                    <label style={{ color: "#36454F", marginLeft: "12px" }}>
                      {userData.password.split("").map(() => "*").join("")}
                    </label>
                  </p>
                </div>
              </div>
            )}
            {editMode && (
              <div className="text-center mt-3">
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  style={{ backgroundColor: "green" }}
                >
                  Save Details
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Profile;
