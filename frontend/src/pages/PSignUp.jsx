// --- Updated PSignup.jsx with improvements and labels ---

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PSignup = () => {
  const [formData, setFormData] = useState({
    dob: "",
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [emailValid, setEmailValid] = useState(null);
  const [usernameValid, setUsernameValid] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [usernameTimeout, setUsernameTimeout] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);
    if (!formData.email) {
      setEmailValid(null);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/check-email",
          {
            email: formData.email,
            type: "patient",
          }
        );
        setEmailValid(!res.data.exists);
      } catch {
        setEmailValid(false);
      }
    }, 500);
    setTypingTimeout(timeout);
  }, [formData.email]);

  useEffect(() => {
    if (usernameTimeout) clearTimeout(usernameTimeout);
    if (!formData.username) {
      setUsernameValid(null);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/check-username",
          {
            username: formData.username,
          }
        );
        setUsernameValid(!res.data.exists);
      } catch {
        setUsernameValid(false);
      }
    }, 500);
    setUsernameTimeout(timeout);
  }, [formData.username]);

  useEffect(() => {
    if (otpSent) {
      document.querySelector("input[name='otp']")?.focus();
    }
  }, [otpSent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup/patient",
        formData
      );
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }
    try {
      console.log(formData.email, formData.otp);
      await axios.post("http://localhost:5000/api/auth/verify", {
        email: formData.email,
        otp: formData.otp,
        type: "patient",
      });
      toast.success("Signup verified!");
      navigate("/login/patient");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    if (!otpSent) {
      await handleSendOtp();
    } else {
      await handleVerifyOtp();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>

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
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                usernameValid === null
                  ? "focus:ring-indigo-500"
                  : usernameValid
                  ? "focus:ring-green-500 border-green-400"
                  : "focus:ring-red-500 border-red-400"
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

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              max={new Date().toISOString().split("T")[0]}
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
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

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  Passwords do not match
                </p>
              )}
          </div>

          {otpSent && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            (otpSent ? !formData.otp : !emailValid || !usernameValid)
          }
          className={`w-full py-2 px-4 cursor-pointer text-white rounded-xl transition ${
            isSubmitting ? "bg-blue-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isSubmitting ? "Processing..." : otpSent ? "Verify" : "Send OTP"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login/patient" className="text-indigo-600 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default PSignup;
