import React from 'react';
import LoginButton from '../Components/LoginButton';
import SignUpButton from '../Components/SignUpButton';
import { Link } from 'react-router-dom';
import logo from "../../public/flowlytics.png"

const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white shadow-2xl w-96 rounded-md h-96 flex flex-col justify-center items-center p-2">
        <div className="heading p-2 m-2">
        <div className="flex items-center">
  <img
    src={logo}
    alt="FlowLytics Logo"
    className="w-20 h-20 object-contain"
  />
  <h1 className="font-bold text-2xl text-gray-800">FlowLytics</h1>
</div>

          
          <h2 className="font-bold text-center"> Seamless Data, Powerful Insights</h2>
          
        </div>
        <div><span className="text-center text-blue-700 mt-5 mb-5 pt-2">Get Started</span></div>
        <div className="buttons flex flex-col gap-4 mt-6">
          <div>
            <Link to="/auth/login">
            <LoginButton label="Login" sx={{ backgroundColor: "black", width: "200px" }} /></Link></div>
          <Link to = "auth/sign-up"><SignUpButton label="Sign Up" sx={{ backgroundColor: "#4CAF50", width: "200px" }} /></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
