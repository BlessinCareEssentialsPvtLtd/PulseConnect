import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PatientLogin = () => {
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
      const res = await axios.post("http://localhost:5000/api/auth/login/patient", {
        identifier,
        password,
        method: loginMethod,
      });

      toast.success(`Welcome ${res.data.patient.name}`);
      navigate("/dashboard/patient", {
        state: {
          patient: res.data.patient,
        },
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Patient Login</h2>

      <div className="flex justify-center gap-4 mb-4">
        {["uniqueId", "email", "username"].map((method) => (
          <label key={method} className="flex items-center gap-2">
            <input
              type="radio"
              name="loginMethod"
              value={method}
              checked={loginMethod === method}
              onChange={(e) => setLoginMethod(e.target.value)}
            />
            {method === "uniqueId" ? "Unique ID" : method.charAt(0).toUpperCase() + method.slice(1)}
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

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default PatientLogin;
