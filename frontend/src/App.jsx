import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DoctorDashboard from "./pages/DoctorDashboard";
import RightSideProfile from "./components/RightSideProfile";
import PSignUp from "./pages/PSignup";
import PLogin from "./pages/PLogin";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion"; // fixed incorrect import
import LandingPage from "./pages/LandingPage";
import CompleteProfile from "./pages/CompleteProfile";
import FamilyCorner from "./pages/FamilyCorner";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const toggleProfileComponent = (value) => {
    setShowProfileComponent(value);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen font-sans space-grotesk">
              <Navbar />
              <div className="flex flex-1 min-w-full bg-[#e9f8ff] h-[calc(100vh-64px)]">
                <Sidebar toggleProfileFunction={toggleProfileComponent} />
                <Dashboard
                  showProfile={showProfileComponent}
                  toggleProfileFunction={toggleProfileComponent}
                />
                {/* Profile Overlay */}
                <AnimatePresence mode="wait">
                  {showProfileComponent && (
                    <motion.div
                      className="absolute inset-0 z-[3] w-full h-full bg-black/50"
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
          }
        />
        <Route
          path="/doctor"
          element={
            <div className="flex flex-col min-h-screen font-sans space-grotesk">
              <Navbar />
              <div className="flex flex-1 min-w-full bg-[#e9f8ff] h-[calc(100vh-64px)]">
                <Sidebar toggleProfileFunction={toggleProfileComponent} />
                <DoctorDashboard
                  showProfile={showProfileComponent}
                  toggleProfileFunction={toggleProfileComponent}
                />
                {/* Profile Overlay */}
                <AnimatePresence mode="wait">
                  {showProfileComponent && (
                    <motion.div
                      className="absolute inset-0 z-[3] w-full h-full bg-black/50"
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
          }
        />
        <Route path="/signup" element={<PSignUp />} />
        <Route path="/login" element={<PLogin />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/family-corner" element={<FamilyCorner />} />
      </Routes>
    </Router>
  );
}

export default App;
