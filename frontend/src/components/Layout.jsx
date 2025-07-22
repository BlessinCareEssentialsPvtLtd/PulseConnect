import { useContext, useEffect, useState } from "react";
import "../App.css";
import { motion, AnimatePresence } from "motion/react";
import RightSideProfile from "./RightSideProfile";
import { showProfileContext } from "../context/showProfileContext";

const Layout = ({ children }) => {
  const { showProfileComponent, setShowProfileComponent } =
    useContext(showProfileContext);

  useEffect(() => {
    console.log(showProfileComponent);
  }, [showProfileComponent]);

  return (
    <div className="flex flex-col bg-[#E9F8FF] ">
      <AnimatePresence mode="wait">
        {showProfileComponent && (
          <motion.div
            className=" absolute inset-0 z-[3]  w-full h-screen bg-black/50"
            onClick={() => setShowProfileComponent(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RightSideProfile />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-16 " id="navbarPlaceholder" />
      <div className="flex flex-1 justify-center md:justify-start overflow-hidden">
        <div
          className=" w-[8.33%] lg:w-[21.4%] h-full hidden md:block"
          id="leftplaceholder"
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;