import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import statesAndDistrictsData from "../data/statesAndDistricts.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const DoctorSignup = () => {
  const [step, setStep] = useState(1);
  const [emailValid, setEmailValid] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        const res = await axios.post("http://localhost:5000/api/auth/check-email", {
          email: formData.email,
        });
        setEmailValid(!res.data.exists);
      } catch (err) {
        setEmailValid(false);
      }
    }, 500);
    setTypingTimeout(timeout);
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      setDistrictOptions(statesAndDistricts[value] || []);
      setFormData((prev) => ({ ...prev, district: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
    }finally {
    setIsSubmitting(false); // end loading regardless of success/failure
  }
  };

  const inputClass = "w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring focus:ring-blue-200";

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 shadow-xl rounded-xl bg-blue-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Doctor Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <input
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleChange}
                required
                className={`${inputClass} ${
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
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              value={formData.dob}
              onChange={handleChange}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                .toISOString()
                .split("T")[0]}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="drId"
              placeholder="DOCTOR ID"
              value={formData.drId}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <button
  type="button"
  onClick={() => {
    if (
      formData.name.trim() &&
      formData.email.trim() &&
      emailValid === true &&
      formData.dob &&
      formData.drId.trim()
    ) {
      setStep(2);
    } else {
      toast.error("Please fill all required fields correctly before proceeding.");
    }
  }}
  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  Next
</button>

          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              name="specialization"
              placeholder="SPECIALIZATION"
              value={formData.specialization}
              onChange={handleChange}
              required
              className={inputClass}
            />
           <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="PASSWORD"
                value={formData.password}
                onChange={handleChange}
                required
                className={`${inputClass} pr-10`} // space for the eye icon
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <input
              type="text"
              name="place"
              placeholder="PLACE"
              value={formData.place}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="city"
              placeholder="CITY"
              value={formData.city}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="taluka"
              placeholder="TALUKA"
              value={formData.taluka}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select State</option>
              {Object.keys(statesAndDistricts).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select District</option>
              {districtOptions.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select
              name="nation"
              value={formData.nation}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="India">India</option>
            </select>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
              >
                Back
              </button>
              <button
  type="submit"
  disabled={isSubmitting}
  className={`w-2/3 py-2 rounded text-white ${
    isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {isSubmitting ? "Sending..." : "Send OTP"}
</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default DoctorSignup;
