import React from "react";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg  max-w-md border border-gray-300 w-[800px]">
        <h2 className="text-xl font-semibold text-purple-700 text-center">
          Did you forget password?
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your email address and we'll send you a link to restore password
        </p>

        <form className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-2 mt-4 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Request reset link
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          <a href="/" className="text-purple-600 hover:underline">
            Back to log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
