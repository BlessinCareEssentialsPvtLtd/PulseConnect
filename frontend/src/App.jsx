// Import necessary libraries and components
// Import necessary libraries and components

import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { AnimatePresence, motion } from "framer-motion"; // fixed incorrect import
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components
// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RightSideProfile from "./components/RightSideProfile";

// Pages
// Pages
import LandingPage from "./pages/LandingPage";
import PSignUp from "./pages/PSignup";
import PLogin from "./pages/PLogin";
import DLogin from "./pages/DLogin";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import CompleteProfile from "./pages/CompleteProfile";
import FamilyCorner from "./pages/FamilyCorner";
import Diagnose from "./pages/Diagnose";
import DSignup from "./pages/DSignup";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const toggleProfileComponent = (value) => {
    setShowProfileComponent(value);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Normal Routes START*/}
          {/* Normal Routes START*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor" element={<DLogin />} />
          <Route path="/doctor/signup" element={<DSignup />} />
          <Route path="/login" element={<PLogin />} />
          <Route path="/signup" element={<PSignUp />} />
          {/* Normal Routes END*/}
          {/* Normal Routes END*/}

          {/* Protected Routes START*/}
          {/* Protected Routes START*/}

          {/* Patient Protected Routes START*/}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1">
                    <Navbar />
                    <Dashboard />
                  </div>
                  {/* <RightSideProfile /> */}
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/diagnose"
            element={
              <PrivateRoute>
                <div className="flex">
                  {/* <Sidebar /> */}
                  <div className="flex-1">
                    <Navbar />
                    <div className="w-full h-full">
                      <Diagnose />
                    </div>
                  </div>
                  {/* <RightSideProfile /> */}
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/complete-profile"
            element={
              <PrivateRoute>
                <div className="flex">
                  {/* <Sidebar /> */}
                  <div className="flex-1">
                    {/* <Navbar /> */}
                    <div className="w-full h-full">
                      <CompleteProfile />
                    </div>
                  </div>
                  {/* <RightSideProfile /> */}
                </div>
              </PrivateRoute>
            }
          />
          {/* Patient Protected Routes END*/}

          {/* Doctor Protected Routes START*/}
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1">
                    <Navbar />
                    <DoctorDashboard />
                  </div>
                  {/* <RightSideProfile /> */}
                </div>
              </PrivateRoute>
            }
          />

          {/* Doctor Protected Routes END*/}

          {/* Protected Routes END*/}
          {/* Protected Routes END*/}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
