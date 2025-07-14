import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function PLogin() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("uniqueId");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      return toast.error("Please enter all fields.");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login/patient",
        {
          identifier,
          password,
          method: loginMethod,
        }
      );

      toast.success(`Welcome ${res.data.patient.name}`);
      localStorage.setItem("patientData", JSON.stringify(res.data.patient));
      navigate("/dashboard/patient", {
        state: { patient: res.data.patient },
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <form
<<<<<<< HEAD
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Patient Login
        </h2>

        {/* Login Method Radio Buttons */}
        <div className="flex justify-center gap-4">
          {["uniqueId", "email", "username"].map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="loginMethod"
                value={method}
                checked={loginMethod === method}
                onChange={(e) => setLoginMethod(e.target.value)}
              />
              {method === "uniqueId"
                ? "Unique ID"
                : method.charAt(0).toUpperCase() + method.slice(1)}
            </label>
          ))}
        </div>

        {/* Identifier Field */}
        <div className="text-left">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {loginMethod === "uniqueId"
              ? "Unique ID"
              : loginMethod.charAt(0).toUpperCase() + loginMethod.slice(1)}
          </label>
          <input
            type={loginMethod === "email" ? "email" : "text"}
            id="identifier"
            name="identifier"
            placeholder={`Enter your ${loginMethod}`}
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
=======
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <div className="space-y-4">
          <div className="text-left">
            <label
              htmlFor="loginId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="loginId"
              name="loginId"
              placeholder="Enter username or email"
              value={form.loginId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
>>>>>>> 9bccbcb3bf2e84a3c10b3e38c362133bb961bc2e
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 cursor-pointer bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600">
          Not having an account?{" "}
<<<<<<< HEAD
          <a href="/signup/patient" className="text-indigo-600 hover:underline">
=======
          <a href="/signup" className="text-indigo-600 hover:underline">
>>>>>>> 9bccbcb3bf2e84a3c10b3e38c362133bb961bc2e
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default PLogin;
