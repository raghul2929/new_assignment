import React, { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import image from "../img/image.png";

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userIconRef = useRef(null);
  const modalRef = useRef(null);  // Ref for the modal itself
  const navigate = useNavigate(); // For navigation after logout

  // Open the logout modal
  const handleUserIconClick = () => {
    setShowLogoutModal(true);
  };

  // Close the modal
  const handleCloseModal = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return;
    }
    setShowLogoutModal(false);
  };

  // Use effect for closing modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      handleCloseModal(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🛠 Logout Function
  const handleLogout = async () => {
    try {
      // Send the logout request to the backend
      await axios.post("https://new-assignment-backend.onrender.com/api/admin/logout", {}, { withCredentials: true });

      // Show an alert and redirect to the login page
      alert("Logged Out Successfully");
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="bg-purple-900 text-white px-6 py-3 flex items-center justify-between relative">
      {/* Logo & Title */}
      <div className="flex items-center space-x-2">
        <Logo className="w-6 h-6" />
        <span className="text-2xl font-semibold">TableSprint</span>
      </div>

      {/* User Profile Icon */}
      <div ref={userIconRef} onClick={handleUserIconClick}>
        <UserCircle className="h-10 w-10 cursor-pointer caret-white" />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          ref={modalRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-md shadow-lg z-10 border border-red-600 p-6"
        >
          <div className="flex items-center justify-center">
            <img src={image} className="w-10 h-10" alt="Profile" />
            <div className="text-lg font-semibold mb-4">Log Out</div>
          </div>
          <p className="mb-4 text-center">Are you sure you want to log out?</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none"
              onClick={handleCloseModal} // Close modal without logging out
            >
              Cancel
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
              onClick={handleLogout} // Logout function call
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
