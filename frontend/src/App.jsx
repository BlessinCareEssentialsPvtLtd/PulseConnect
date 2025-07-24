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
// import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorDashboard2 from "./pages/DoctorDashboard2";
import Diagnose from "./pages/Diagnose";
import AppointmentRequest from "./pages/AppointmentRequest";
import Fitness from "./pages/Fitness";
import Appointments from "./components/Appointments";


// Optional: 403 error page
import Unauthorized from "./pages/Unauthorized"; // create this
import CurPatDash from "./pages/CurPatDash";
import Family from "./pages/Family";
import Records from "./pages/Records";
import { ShowProfileProvider } from "./context/showProfileContext";
import React, { useState } from "react";
import HealthLine from "./pages/HealthLine";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);
  return (
    <ShowProfileProvider value={{ showProfileComponent, setShowProfileComponent }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/patient" element={<PLogin />} />
        <Route path="/signup/patient" element={<PSignup />} />
        <Route path="/login/doctor" element={<DLogin />} />
        <Route path="/signup/doctor" element={<DSignup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/dashboard/patient/curpatdash" element={<CurPatDash />} />

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
              <DashboardLayout>
                <PatientDashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <DashboardLayout>
                <Appointments />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/family"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <DashboardLayout>
                <Family />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment-request"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <DashboardLayout>
                <AppointmentRequest />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/records"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <DashboardLayout>
                <Records />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/fitness"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <DashboardLayout>
                <Fitness />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/healthline"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <DashboardLayout>
                <HealthLine />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Doctor Protected Routes */}
        <Route
          path="/dashboard/doctor"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DashboardLayout>
                <DoctorDashboard2 />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DashboardLayout>
                <DoctorDashboard2 />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/diagnose"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <DashboardLayout>
                <Diagnose />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </ShowProfileProvider>
  );
}

export default App;
