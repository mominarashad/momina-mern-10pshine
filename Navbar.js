import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../Utils/Logger";
import {
  FaSearch,
  FaStickyNote,
  FaPlusCircle,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa"; 
const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleSuccess("Logged out successfully!");
    navigate("/login");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value); // optional search callback
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left Section: App Name + Icon */}
        <div className="navbar-left">
          {/* <FaStickyNote className="navbar-icon" /> */}
          <button className="navbar-title" onClick={() => navigate("/home")}>
          My Notes App
        </button>
        </div>

        {/* Center Section: Search */}
        <div className="navbar-search">
          <FaSearch className="search-icon" />
          &nbsp; &nbsp;
          <input
            type="text"
            placeholder="Search your notes..."
            value={query}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {/* Right Section: Buttons */}
        <div className="navbar-buttons">
          <button
            className="new-note-button"
            onClick={() => navigate("/add-notes")}
          >
            <FaPlusCircle className="btn-icon" /> New Note
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="btn-icon" /> Logout
          </button>
          <button className="profile-button" onClick={()=> navigate('/update-user')}>
            <FaUser className="btn-icon" /> 
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
