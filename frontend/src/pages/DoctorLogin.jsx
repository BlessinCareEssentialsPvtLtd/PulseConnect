import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const DoctorLogin = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!identifier || !password) {
    return toast.error("Please enter all fields.");
  }

  try {
    const res = await axios.post("/api/auth/login/doctor", {
      identifier,
      password,
    });

    // ✅ Check if res.data and res.data.doctor exist before using them
    if (res.data?.doctor) {
      toast.success(`Welcome Dr. ${res.data.doctor.name}`);
      // console.log(res.data.doctor);
      navigate("/dashboard/doctor", {
        state: {
          doctor: res.data.doctor,
        },
      });
    } else {
      toast.error("Login response was invalid.");
    }
  } catch (err) {
    console.error("Login error:", err);
    const errorMessage = err.response?.data?.message || "Login failed";
    toast.error(errorMessage);
  }
};


  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Doctor Login
        </h2>

        {/* Login Method Radio Buttons */}
        {/* <div className="flex justify-center gap-4">
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
        </div> */}

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
          <a href="/signup/doctor" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default DoctorLogin;