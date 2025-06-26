import React from "react";

const Navbar = () => {
  return (
    <nav className="flex w-full h-14 bg-gray-100 shadow-md">
      {/* Left Section: Logo */}
      <div className="flex flex-1 items-center justify-center bg-primary text-white">
        <h1 className="font-mono font-semibold text-2xl">PulseConnect</h1>
      </div>

      {/* Middle Section: Navigation */}
      <div className="flex-[3] flex items-center justify-center space-x-6 p-2">
        <div className="w-full bg-stone-50 h-4/5 ">
          <input
            className="w-full h-full text-left placeholder:text-center px-2 text-xl rounded-lg"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right Section: Settings */}
      <div className="flex-1 flex items-center justify-around gap-2 text-lg">
        <button className="text-gray-700 hover:text-blue-500">
          ⚙️ Settings
        </button>
        <button className="text-gray-700 hover:text-blue-500">
          Notification
        </button>
        <button className="text-gray-700 hover:text-blue-500">Help</button>
      </div>
    </nav>
  );
};

export default Navbar;
