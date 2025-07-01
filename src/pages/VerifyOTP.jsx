import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify", {
        email: state.email,
        otp,
        type: state.type,
      });
      console.log(res.data.uniqueId);
      toast.success("Verification successful! Check your email for your unique ID.");
      if(state.type === "patient") {
        navigate("/login/patient");
      } else {
        navigate("/login/doctor");
      }
    } catch (err) {
      toast.error("Invalid OTP");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" 
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" 
        disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
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
      </form>
    </div>
  );
};

export default VerifyOTP;
