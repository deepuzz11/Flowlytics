import React from "react";
import logo from "../../public/flowlytics.png"
const Navbar = () => {
  return (
    <nav className="navbar bg-white text-blue-800 py-4 px-6 shadow-md rounded-md flex justify-between items-center">
      {/* Logo Section */}
      <div className="text-2xl font-bold flex justify-center items-center">
        <img src={logo} alt="" width="60px"/>
        <h1>
          FlowLytics
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-lg font-medium">
        {/* <li className="cursor-pointer transition duration-300">
          Home
        </li> */}
        <li className="cursor-pointer transition duration-300">
          Upload Dataset
        </li>
        <li className="cursor-pointer transition duration-300">
          Data Cleaning
        </li>
        <li className="cursor-pointer transition duration-300">
          Visualization
        </li>
        <li className="cursor-pointer transition duration-300">
          Tutorials
        </li>
        <li className="cursor-pointer transition duration-300">
          Modeling
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
