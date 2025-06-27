import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    specialization: "",
    dob: "",
    drId: "",
    password: "",
  });

  const [checking, setChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
     if (e.target.name === "username") {
      setUsernameAvailable(null); // reset availability if username changes
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/auth/signup/doctor", formData);
    toast.success("OTP sent to your email");
    setTimeout(() => {
      navigate("/verify-otp", {
        state: { email: formData.email, type: "doctor" },
      });
    }, 1500);
  } catch (err) {
    toast.error("Signup failed: " + err.response?.data?.message);
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Doctor Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "specialization", "dob", "drId", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.toUpperCase()}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        ))}
        <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-4 py-2 border rounded">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default DoctorSignup;
