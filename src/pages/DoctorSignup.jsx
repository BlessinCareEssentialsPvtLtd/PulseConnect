import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import statesAndDistrictsData from "../data/statesAndDistricts.json";

const DoctorSignup = () => {
  const [emailValid, setEmailValid] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    specialization: "",
    dob: "",
    drId: "",
    password: "",
    place: "",
    city: "",
    taluka: "",
    district: "",
    state: "",
    nation: "India",
  });

  const [districtOptions, setDistrictOptions] = useState([]);
  const [statesAndDistricts, setStatesAndDistricts] = useState({});

  useEffect(() => {
    setStatesAndDistricts(statesAndDistrictsData);
  }, []);

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    if (!formData.email) {
      setEmailValid(null);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/check-email", { email: formData.email });
        setEmailValid(!res.data.exists);
      } catch (err) {
        setEmailValid(false);
      }
    }, 500);
    setTypingTimeout(timeout);
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "state") {
      setDistrictOptions(statesAndDistricts[value] || []);
      setFormData((prev) => ({ ...prev, district: "" }));
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
        {[
          "name",
          "email",
          "specialization",
          "dob",
          "drId",
          "password",
          "place",
          "city",
          "taluka",
          "nation",
        ].map((field) => {
          if (field === "nation") {
            return (
              <select
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              >
                <option value="India">India</option>
              </select>
            );
          } else if (field === "email") {
            return (
              <div key={field} className="relative">
                <input
                  type="email"
                  name={field}
                  placeholder={field.toUpperCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border rounded ${
                    emailValid === null
                      ? ""
                      : emailValid
                      ? "shadow-[0_0_5px_2px_green]"
                      : "shadow-[0_0_5px_2px_red]"
                  }`}
                />
                {emailValid !== null && (
                  <p
                    className={`text-sm mt-1 ${
                      emailValid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {emailValid ? "Available" : "Not available"}
                  </p>
                )}
              </div>
            );
          } else {
            return (
              <input
                key={field}
                type={field === "password" ? "password" : field === "dob" ? "date" : "text"}
                name={field}
                placeholder={field.toUpperCase()}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
                max={
                  field === "dob"
                    ? new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                        .toISOString()
                        .split("T")[0]
                    : undefined
                }
              />
            );
          }
        })}

        <select name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-2 border rounded">
          <option value="">Select State</option>
          {Object.keys(statesAndDistricts).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select name="district" value={formData.district} onChange={handleChange} required className="w-full px-4 py-2 border rounded">
          <option value="">Select District</option>
          {districtOptions.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

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
