import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";
import { AnimatePresence, motion } from "motion/react";
import RightSideProfile from "./components/RightSideProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import Fitness from "./components/Fitness";
import Records from "./pages/Records";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const toggleProfileComponent = (value) => {
    setShowProfileComponent(value);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans space-grotesk">
      <Navbar />
      <div className="flex flex-1 min-w-full bg-[#e9f8ff] h-[calc(100vh-64px)]">
        {/* Sidebar and Fitness components taking full height */}
        <Sidebar  toggleProfileFunction={toggleProfileComponent} />
        <Records/>
        {/* <Fitness /> */}
        {/* <Dashboard
          showProfile={showProfileComponent}
          toggleProfileFunction={toggleProfileComponent}
        /> */}

        {/* <DoctorDashboard /> */}

        <AnimatePresence mode="wait">
          {showProfileComponent && (
            <motion.div
              className=" absolute inset-0 z-[3]  w-full h-full bg-black/50"
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
}

export default App;
