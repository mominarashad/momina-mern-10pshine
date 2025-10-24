import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../Utils/Logger";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleSuccess("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">My Notes App</h1>
        <div className="navbar-buttons">
          <button
            className="new-note-button"
            onClick={() => navigate("/add-notes")}
          >
            ➕ New Note
          </button>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
