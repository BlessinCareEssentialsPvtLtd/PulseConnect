import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DoctorSignup from "./pages/DoctorSignup";
import VerifyOTP from "./pages/VerifyOTP";
// import other pages as needed

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<DoctorSignup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
