import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserP.css";
import Navbar from "../Navbar/Navbar";
import { handleSuccess, handleError } from "../../Utils/Logger"; //  Toast helpers
import { ToastContainer } from "react-toastify"; //  Toast container
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

const UserP = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  const [file, setFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Fetch user info on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.content);
        } else {
          handleError("Failed to fetch user info");
        }
      })
      .catch((err) => {
        console.error(err);
        handleError("Error fetching profile");
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (file) formData.append("profilePicture", file);
    if (currentPassword) formData.append("currentPassword", currentPassword);
    if (newPassword) formData.append("newPassword", newPassword);
    if (confirmPassword) formData.append("confirmPassword", confirmPassword);

    try {
      const res = await axios.put(
        "http://localhost:8080/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        handleSuccess("Profile updated successfully!");
        setUser(res.data.content);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setFile(null);
      } else {
        handleError(res.data.message || "Profile update failed");
      }
    } catch (err) {
      console.error(err);
      handleError("Error updating profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>User Profile</h2>

        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Left side - profile picture */}
          <div className="profile-picture">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePicture || "/default-avatar.png"
              }
              alt="Profile"
            />
            <input type="file" onChange={handleFileChange} />
          </div>

          {/* Right side - input fields */}
          <div className="profile-fields">
            <label>Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <label>Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Update Profile</button>
          </div>
        </form>

        {/* ✅ Toasts visible globally */}
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </>
  );
};

export default UserP;
