import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RightSideProfile from "./components/RightSideProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import Fitness from "./pages/Fitness";
import HealthNews from "./pages/HealthNews";
import InsurancePage from "./pages/InsurancePage";
import DoctorAppointmentSection from "./pages/DoctorAppointmentSection";
import PatientAppointmentSection from "./pages/PatientAppointmentSection";
import Notification from "./pages/Notification";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const toggleProfileComponent = (value) => {
    setShowProfileComponent(value);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans space-grotesk">
        <Navbar />
        <div className="flex flex-1 min-w-full bg-[#e9f8ff] h-[calc(100vh-64px)]">
          <Sidebar toggleProfileFunction={toggleProfileComponent} />

          {/* <div className="ml-[20vw] w-[80vw] px-4 py-6 overflow-y-auto"> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/doctor-appointments" element={<DoctorAppointmentSection />} />
              <Route path="/patient-appointments" element={<PatientAppointmentSection />} />
              <Route path="/insurance" element={<InsurancePage />} />
              <Route path="/health-news" element={<HealthNews />} />
              <Route path="/notifications" element={<Notification />} />
            </Routes>
          {/* </div> */}
        </div>

        {/* Optional Profile Side Panel */}
        {/* 
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
        */}
      </div>
    </Router>
  );
}

export default App;
