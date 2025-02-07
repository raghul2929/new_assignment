import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "../img/background.png";
import logo from "../img/logo.png";
import { Eye, EyeOff } from "lucide-react"; // Eye icons from lucide-react

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/adminlogin",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login Successful");
      navigate("/contains");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-violet-100">
      <div
        className="flex items-center justify-center w-[1000px] h-[700px] bg-center bg-cover bg-no-repeat pr-64 pt-40"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="bg-white shadow-lg rounded-lg p-8 w-[350px] h-[450px] mb-64 mr-9">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            <img src={logo} alt="Logo" />
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Welcome to TableSprint Admin
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute top-9 right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <div className="text-right mb-4">
              <Link to="/forgotpassword" className="text-purple-500 text-sm">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex justify-center items-center"
            >
              <span className="px-3">Log In</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
