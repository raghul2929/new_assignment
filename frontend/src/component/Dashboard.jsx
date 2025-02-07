import React from 'react';
import logo from "../img/logo.png";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50 ml-60 mt-[40px] p-40">
      {/* Dashboard Container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-10 text-center">
        
        {/* Logo Section */}
        <div className="flex justify-center">
          <img src={logo} alt="TableSprint Logo" className="h-24 w-auto" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Welcome to <span className="text-yellow-500">TableSprint</span> Admin Panel
        </h1>

        {/* Dashboard Info */}
        <p className="text-gray-600 mt-2">
          Manage your categories, subcategories, and products efficiently.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
