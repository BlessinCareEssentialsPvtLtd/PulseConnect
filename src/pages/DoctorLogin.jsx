import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const DoctorLogin = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("uniqueId");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      return toast.error("Please enter all fields.");
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login/doctor", {
        identifier,
        password,
        method: loginMethod,
      });
    
      toast.success(`Welcome Dr. ${res.data.name}`);
      // Store doctor data locally or redirect
      navigate("/dashboard/doctor"); // Create this route later
    } catch (err) {
      toast.error(err.response.data.message,"Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Doctor Login</h2>
      
      {/* Login method toggle */}
      <div className="flex justify-center gap-4 mb-4">
        {["uniqueId", "email", "username"].map((method) => (
          <label key={method} className="flex items-center gap-1">
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

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type={loginMethod === "email" ? "email" : "text"}
          placeholder={`Enter your ${loginMethod}`}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;
