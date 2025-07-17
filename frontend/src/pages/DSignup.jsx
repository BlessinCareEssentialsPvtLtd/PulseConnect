import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import statesAndDistrictsData from "../data/statesAndDistricts.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const DSignup = () => {
  const [step, setStep] = useState(1);
  const [emailValid, setEmailValid] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    specialization: "",
    degree: "",
    dob: "",
    drId: "",
    password: "",
    place: "",
    city: "",
    taluka: "",
    district: "",
    state: "",
    nation: "India",
    photo: "",
    experience: "",
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
        const res = await axios.post("/api/auth/check-email", {
          email: formData.email,
          type: "doctor",
        });
        setEmailValid(!res.data.exists);
      } catch (err) {
        setEmailValid(false);
      }
    }, 500);
    setTypingTimeout(timeout);
  }, [formData.email]);

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) =>
      console.error("Base64 conversion error:", error);
  };

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
      await axios.post("/api/auth/signup/doctor", formData);
      toast.success("OTP sent to your email");
      setStep(3); // Move to OTP step
    } catch (err) {
      toast.error("Signup failed: " + err.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoadingOtp(true);
    try {
      await axios.post("/api/auth/verify", {
        email: formData.email,
        otp,
        type: "doctor",
      });
      toast.success(
        "Verification successful! Check your email for your unique ID."
      );
      setTimeout(() => {
        navigate("/login/doctor");
      }, 1500);
    } catch (err) {
      toast.error("Invalid OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  // Step indicator
  const StepIndicator = () => (
    <div className="flex justify-center mb-6 space-x-4">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-lg font-bold ${
          step === 1
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-indigo-600 border-indigo-400"
        }`}
      >
        1
      </div>
      <div className="w-8 h-1 bg-indigo-300 self-center rounded" />
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-lg font-bold ${
          step === 2
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-indigo-600 border-indigo-400"
        }`}
      >
        2
      </div>
      <div className="w-8 h-1 bg-indigo-300 self-center rounded" />
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-lg font-bold ${
          step === 3
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-indigo-600 border-indigo-400"
        }`}
      >
        3
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={step === 3 ? handleVerifyOtp : handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Doctor Signup
        </h2>
        <StepIndicator />
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                  emailValid === null
                    ? "focus:ring-indigo-500"
                    : emailValid
                    ? "focus:ring-green-500 border-green-400"
                    : "focus:ring-red-500 border-red-400"
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
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                    .toISOString()
                    .split("T")[0]
                }
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Doctor ID
              </label>
              <input
                type="text"
                name="drId"
                placeholder="Doctor ID"
                value={formData.drId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (
                  formData.fullName.trim() &&
                  formData.email.trim() &&
                  emailValid === true &&
                  formData.dob &&
                  formData.drId.trim()
                ) {
                  setStep(2);
                } else {
                  toast.error(
                    "Please fill all required fields correctly before proceeding."
                  );
                }
              }}
              className="w-full py-2 px-4 cursor-pointer text-white rounded-xl transition bg-indigo-600 hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Degree
                </label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select Degree</option>
                  <option value="MBBS">MBBS</option>
                  <option value="MD">MD</option>
                  <option value="MS">MS</option>
                  <option value="BDS">BDS</option>
                  <option value="MDS">MDS</option>
                  <option value="DM">DM</option>
                  <option value="DNB">DNB</option>
                  <option value="BHMS">BHMS</option>
                  <option value="BAMS">BAMS</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">Select Years of Experience</option>
                {[...Array(10).keys()].map((year) => (
                  <option key={year} value={year}>
                    {year} year{year !== 1 && "s"}
                  </option>
                ))}
                <option value="10+">10+ years</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-sm text-blue-600 mt-1"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Place
                </label>
                <input
                  type="text"
                  name="place"
                  placeholder="Place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Taluka
                </label>
                <input
                  type="text"
                  name="taluka"
                  placeholder="Taluka"
                  value={formData.taluka}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select State</option>
                  {Object.keys(statesAndDistricts).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  District
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select District</option>
                  {districtOptions.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nation
                </label>
                <select
                  name="nation"
                  value={formData.nation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="India">India</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Upload Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const maxSizeInBytes = 1 * 1024 * 1024;
                    if (file.size > maxSizeInBytes) {
                      toast.error("File size must be less than 1MB");
                      return;
                    }
                    convertToBase64(file, (base64) => {
                      setFormData((prev) => ({ ...prev, photo: base64 }));
                    });
                  }
                }}
                className="w-full px-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-2 px-4 cursor-pointer text-gray-700 rounded-xl transition bg-gray-200 hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-2/3 py-2 px-4 cursor-pointer text-white rounded-xl transition ${
                  isSubmitting
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-blue-700">
              Verify OTP
            </h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 cursor-pointer text-white rounded-xl transition bg-green-600 hover:bg-green-700"
              disabled={loadingOtp}
            >
              {loadingOtp ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        )}
        <p className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <a href="/login/doctor" className="text-indigo-600 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default DSignup;
