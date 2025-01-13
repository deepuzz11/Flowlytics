import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpButton from "../Component/SignUpButton";
import logo from "../../public/logo.png";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, firstName, lastName);
    if (!email || !password || !firstName) {
      toast.error("All credentials are required", { autoClose: 1000 });
      return;
    }

    try {
      setEmail(email);
      setPassword(password);
      setFirstName(firstName);
      setLastName(lastName);
      toast.success("SignUp Successfully", { autoClose: 1000 });
      navigate("/flow-lytics");
    } catch (error) {
      toast.error("Cannot login at the moment", { autoClose: 1000 });
    } finally {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="bg-white w-full max-w-sm p-6 rounded-md shadow-2xl">
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="FlowLytics Logo"
            className="w-16 h-16 object-contain"
          />
          <h1 className="font-bold text-3xl text-gray-800">FlowLytics</h1>
        </div>

        <p className="text-center text-gray-500 mb-6">
          Seamless Data, Powerful Insights
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700 mb-1"
            >
              What's your name
            </label>
            <div className="flex mb-2 gap-2">
              <input
                value={firstName}
                type="text"
                name="name"
                id="firstname"
                placeholder="John"
                className="px-4 py-2 border rounded-[4px] bg-[#eeeeee] text-lg placeholder:text-base w-1/2"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                name="name"
                id="lastname"
                placeholder="Doe"
                className="px-4 py-2 border rounded-[4px] bg-[#eeeeee] text-lg placeholder:text-base w-1/2"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700 mb-1"
            >
              What's your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="abc@example.com"
              className="px-4 py-2 border rounded-sm bg-gray-100 text-lg w-full"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-gray-700 mb-1"
            >
              What's your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              className="px-4 py-2 border rounded-sm bg-gray-100 text-lg w-full"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <SignUpButton
            label="Create an Account"
            sx={{
              backgroundColor: "rgb(31 41 55)",
              color: "white",
              width: "100%",
              textTransform: "none",
              fontSize: "16px",
              padding: "10px",
              marginTop: "10px",
            }}
            type="submit"
          />
          <div className="flex justify-center text-sm mt-2">
            <p>
              Already a member?{" "}
              <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
                <Link to="/auth/login">Login</Link>
              </span>
            </p>
          </div>
        </form>

        <div className="flex items-center my-2">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            aria-label="Continue with Google"
          >
            Continue with Google
          </button>
          <button
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition duration-200"
            aria-label="Continue with GitHub"
          >
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
