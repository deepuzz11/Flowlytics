import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");

    try {
      toast.success("Logged out successfully!", { autoClose: 1000 });
    navigate("/auth/login");
    } catch (error) {
      toast.error('cannot logout at this moment', {autoClose:1000})
    }
  };

  return (
    <nav className="navbar bg-white text-blue-800 py-4 px-6 shadow-md rounded-md flex justify-between items-center flex-wrap">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        <div className="flex justify-center items-center">
          <img src={logo} alt="" width="60px" />
          <h1>FlowLytics</h1>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-lg font-medium flex-wrap mt-2 sm:mt-0">
        <li className="cursor-pointer transition duration-300">Upload Dataset</li>
        <li className="cursor-pointer transition duration-300">Data Cleaning</li>
        <li className="cursor-pointer transition duration-300">Visualization</li>
        <li className="cursor-pointer transition duration-300">Tutorials</li>
        <li
          className="cursor-pointer transition duration-300"
          onClick={handleLogout}  // Trigger the logout function
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
