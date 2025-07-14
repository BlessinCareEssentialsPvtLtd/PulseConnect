import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import Appointments from "./components/Appointments"; // adjust path if different
import DashboardLayout from "./layout/DashboardLayout";

import PatientDashboard from "./pages/PatientDashboard";
import PLogin from "./pages/PLogin.jsx";
import PSignUp from "./pages/PSignUp.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorSignup from "./pages/DoctorSignup";
import VerifyOTP from "./pages/VerifyOTP";
import AppointmentRequest from "./pages/AppointmentRequest.jsx";
// import other pages as needed

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/signup/doctor" element={<DoctorSignup />} />
        <Route path="/login/doctor" element={<DoctorLogin />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route
          path="/dashboard/patient"
          element={
            <PatientDashboard
              patient={JSON.parse(localStorage.getItem("patientData"))}
            />
          }
        />
        <Route path="/appointment-request" element={<AppointmentRequest />} />
        <Route
          path="/dashboard/patient/appointments"
          element={
            <DashboardLayout
              patient={JSON.parse(localStorage.getItem("patientData"))}
            >
              <Appointments />
            </DashboardLayout>
          }
        />
        {/* Add other routes here */}
        {/* mine */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/patient" element={<PLogin />} />
        <Route path="/signup/patient" element={<PSignUp />} />
        {/* mine */}
      </Routes>
    </>
  );
}

export default App;
