import React from "react";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to PulseConnect
        </h1>
        <p className="text-gray-500 mb-6">
          Your one-stop solution for all medical management needs.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="w-full py-2 px-4 bg-white text-indigo-600 border border-indigo-600 rounded-xl hover:bg-indigo-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
