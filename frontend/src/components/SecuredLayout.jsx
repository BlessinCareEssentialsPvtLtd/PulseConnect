import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import RightSideProfile from "./RightSideProfile";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";

function SecuredLayout() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const toggleProfileComponent = (val) => setShowProfileComponent(val);

  return (
    <div className="flex flex-col min-h-screen font-sans space-grotesk">
      <Navbar />
      <div className="flex flex-1 min-w-full bg-[#e9f8ff] h-[calc(100vh-64px)]">
        <Sidebar toggleProfileFunction={toggleProfileComponent} />
        <Outlet
          context={{
            toggleProfileFunction: toggleProfileComponent,
            showProfileComponent,
          }}
        />
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
  );
}

export default SecuredLayout;
