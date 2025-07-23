// src/App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layout/DashboardLayout";

import LandingPage from "./pages/LandingPage";
import PLogin from "./pages/PLogin";
import PSignup from "./pages/PSignup";
import DLogin from "./pages/DLogin";
import DSignup from "./pages/DSignup";
import CompleteProfile from "./pages/CompleteProfile";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorDashboard2 from "./pages/DoctorDashboard2";
import Diagnose from "./pages/Diagnose";
import AppointmentRequest from "./pages/AppointmentRequest";
import Appointments from "./components/Appointments";

// Optional: 403 error page
import Unauthorized from "./pages/Unauthorized"; // create this

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/patient" element={<PLogin />} />
        <Route path="/signup/patient" element={<PSignup />} />
        <Route path="/login/doctor" element={<DLogin />} />
        <Route path="/signup/doctor" element={<DSignup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Patient Protected Routes */}
        <Route path="/complete-profile" element={
          <PrivateRoute allowedRoles={["patient"]}>
            <CompleteProfile />
          </PrivateRoute>
        } />
        <Route
          path="/dashboard/patient"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <PatientDashboard
                patient={JSON.parse(localStorage.getItem("patientData"))}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/patient/appointments"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <DashboardLayout
                patient={JSON.parse(localStorage.getItem("patientData"))}
              >
                <Appointments />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment-request"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <AppointmentRequest />
            </PrivateRoute>
          }
        />

        {/* Doctor Protected Routes */}
        <Route
          path="/dashboard/doctor"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorDashboard2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DoctorDashboard2 />
            </PrivateRoute>
          }
        />
        <Route
          path="/diagnose"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <Diagnose />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
