import React from "react";
import LoginButton from "../Component/LoginButton";
import SignUpButton from "../Component/SignUpButton";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-300">
      <div className="bg-white shadow-2xl w-96 rounded-lg flex flex-col justify-center items-center p-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="FlowLytics Logo"
            className="w-20 h-20 mb-4 object-contain"
          />
          <h1 className="font-bold text-3xl text-gray-800">FlowLytics</h1>
          <h2 className="text-center text-blue-700 text-lg mt-2">
            Seamless Data, Powerful Insights
          </h2>
        </div>

        {/* Get Started Section */}
        <div className="text-center text-blue-700 mt-6 text-sm font-medium">
          Get Started
        </div>

        {/* Buttons Section */}
        <div className="buttons flex flex-col gap-4 mt-6">
          <div>
            <Link to="/auth/login">
              <LoginButton
                label="Login"
                sx={{ backgroundColor: "black", width: "200px" }}
              />
            </Link>
          </div>
          <div>
          <Link to = "/auth/sign-up">
          <SignUpButton
            label="Sign Up"
            sx={{ backgroundColor: "#4CAF50", width: "200px" }}
          /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
