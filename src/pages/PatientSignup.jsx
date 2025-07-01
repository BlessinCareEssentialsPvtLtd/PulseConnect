import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import statesAndDistrictsData from "../data/statesAndDistricts.json";

const PatientSignup = () => {
  const [step, setStep] = useState(1);
  const [emailValid, setEmailValid] = useState(null);
  const [usernameValid, setUsernameValid] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [usernameTimeout, setUsernameTimeout] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    gender: "",
    dob: "",
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

  // Check email availability
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
          type: "patient",
        });
        setEmailValid(!res.data.exists);
      } catch {
        setEmailValid(false);
      }
    }, 500);
    setTypingTimeout(timeout);
  }, [formData.email]);

  // Check username availability
  useEffect(() => {
    if (usernameTimeout) clearTimeout(usernameTimeout);
    if (!formData.username) {
      setUsernameValid(null);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/check-username", {
          username: formData.username,
        });
        setUsernameValid(!res.data.exists);
      } catch {
        setUsernameValid(false);
      }
    }, 500);
    setUsernameTimeout(timeout);
  }, [formData.username]);

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
      await axios.post("http://localhost:5000/api/auth/signup/patient", formData);
      toast.success("OTP sent to your email");
      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email: formData.email, type: "patient" },
        });
      }, 1500);
    } catch (err) {
      toast.error("Signup failed: " + err.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring focus:ring-blue-200";

  const isStepOneComplete =
    formData.name &&
    formData.email &&
    formData.username &&
    formData.phone &&
    formData.gender &&
    formData.dob &&
    formData.password &&
    emailValid &&
    usernameValid;

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 shadow-xl rounded-xl bg-blue-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Patient Signup</h2>
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
                type="text"
                name="username"
                placeholder="USERNAME"
                value={formData.username}
                onChange={handleChange}
                required
                className={`${inputClass} ${
                  usernameValid === null
                    ? ""
                    : usernameValid
                    ? "shadow-[0_0_5px_2px_green]"
                    : "shadow-[0_0_5px_2px_red]"
                }`}
              />
              {usernameValid !== null && (
                <p
                  className={`text-sm mt-1 ${
                    usernameValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {usernameValid ? "Username available" : "Username taken"}
                </p>
              )}
            </div>

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
                  {emailValid ? "Email available" : "Email taken"}
                </p>
              )}
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="PHONE"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="date"
              name="dob"
              placeholder="DOB"
              value={formData.dob}
              onChange={handleChange}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 5))
                .toISOString()
                .split("T")[0]}
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
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

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

            <button
              type="button"
              disabled={!isStepOneComplete}
              onClick={() => setStep(2)}
              className={`w-full py-2 rounded text-white ${
                isStepOneComplete
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
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
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
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

export default PatientSignup;
