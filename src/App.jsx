import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import PatientDashboard from "./pages/PatientDashboard";
import PatientLogin from "./pages/PatientLogin.jsx"
import PatientSignup from "./pages/PatientSignup.jsx";
import HomePage from "./pages/HomePage";
import DoctorDashboard from "./pages/DoctorDashboard"
import DoctorLogin from "./pages/DoctorLogin";
import DoctorSignup from "./pages/DoctorSignup";
import VerifyOTP from "./pages/VerifyOTP";
// import other pages as needed

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="singup/doctor" element={<DoctorSignup/>} />
        <Route path="/login/doctor" element = {<DoctorLogin/>}/>
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard/>}/>
        <Route path="/signup/patient" element={<PatientSignup />} />
        <Route path="/login/patient" element={<PatientLogin />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} /> 

        {/* Add other routes here */}
      </Routes>
    </>
  );
}

export default App;
