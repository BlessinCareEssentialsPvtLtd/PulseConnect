import { AlarmClock, Bell, ToggleLeft } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex max-w-full h-14 md:h-16 fixed z-[5] w-screen bg-white border-b border-blue-800">
      {/* Left Section: Placeholder */}
      <div className="w-[48px] md:w-[80px] lg:w-[20vw]" id="emptyPlaceholder" />

      {/* Middle Section: Search Bar */}
      <div className="flex-[3] flex items-center justify-center space-x-6 p-2">
        <div className="w-full bg-white h-4/5 rounded-lg shadow-md flex items-center border border-blue-800">
          <input
            className="w-full h-full text-left placeholder:text-gray-400 px-4 text-sm md:text-base rounded-full focus:outline-none"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex-1 flex items-center justify-around gap-4 text-blue-800">
        <section className="flex flex-col items-center text-sm hover:text-blue-300 cursor-pointer">
          <AlarmClock size={28} />
          <span className="hidden md:block">Alert</span>
        </section>
        <section className="flex flex-col items-center text-sm hover:text-blue-300 cursor-pointer">
          <Bell size={28} />
          <span className="hidden md:block">Notifications</span>
        </section>
        <section className="flex flex-col items-center text-sm hover:text-blue-300 cursor-pointer">
          <ToggleLeft size={28} />
          <span className="hidden md:block">Theme</span>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
