import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RightSideProfile from "./components/RightSideProfile";

import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import CompleteProfile from "./pages/CompleteProfile";
import FamilyCorner from "./pages/FamilyCorner";

import PLogin from "./pages/PLogin";
import PSignUp from "./pages/PSignup";
import LandingPage from "./pages/LandingPage";

import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);
  const toggleProfileComponent = (value) => setShowProfileComponent(value);

  const AppLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen font-sans space-grotesk">
      <Navbar />
      <div className="flex flex-1 w-full bg-[#e9f8ff] h-[calc(100vh-64px)]">
        <Sidebar toggleProfileFunction={toggleProfileComponent} />
        {children}
        <AnimatePresence mode="wait">
          {showProfileComponent && (
            <motion.div
              className="absolute inset-0 z-[3] bg-black/50"
              onClick={() => setShowProfileComponent(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RightSideProfile
                show={showProfileComponent}
                toggleProfileFunction={toggleProfileComponent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<PLogin />} />
          <Route path="/signup" element={<PSignUp />} />
          <Route path="/landing" element={<LandingPage />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Dashboard
                    showProfile={showProfileComponent}
                    toggleProfileFunction={toggleProfileComponent}
                  />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <PrivateRoute>
                <AppLayout>
                  <DoctorDashboard
                    showProfile={showProfileComponent}
                    toggleProfileFunction={toggleProfileComponent}
                  />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/complete-profile"
            element={
              // <PrivateRoute>
              <CompleteProfile />
              // </PrivateRoute>
            }
          />
          <Route
            path="/family-corner"
            element={
              <PrivateRoute>
                <FamilyCorner />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
