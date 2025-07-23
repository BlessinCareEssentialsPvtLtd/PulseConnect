import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/Authcontext";

function PLogin() {
  const navigate = useNavigate();
  const { token, role, login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token && role === "patient") {
      navigate("/dashboard/patient");
    }
  }, [navigate, token, role]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      return toast.error("Please enter all fields.");
    }

    try {
      const res = await api.post("/auth/login/patient", {
        identifier,
        password,
      });

      toast.success(`Welcome ${res.data.patient.fullName}`);
      login(res.data.token, "patient", res.data.patient);
      if (res.data.patient.isCompleted) {
        navigate("/dashboard/patient");
      } else {
        navigate("/complete-profile");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Patient Login
        </h2>
        {/* Identifier Field */}
        <div className="text-left">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder={`Enter your Username or Email`}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        {/* Password Field */}
        <div className="text-left relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-sm text-gray-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 cursor-pointer bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Log In
        </button>
        <p className="text-center text-sm text-gray-600">
          Not having an account?{" "}
          <a href="/signup/patient" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default PLogin;
