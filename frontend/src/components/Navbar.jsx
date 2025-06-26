import React from "react";

const Navbar = () => {
  return (
    <nav className="flex max-w-full h-12 md:h-16 bg-gray-100">
      {/* Left Section: Logo */}
      <div className="flex flex-1 items-center justify-center bg-primary text-white">
        <h1 className="font-mono font-semibold text-xl md:text-2xl">
          PulseConnect
        </h1>
      </div>

      {/* Middle Section: Navigation */}
      <div className="flex-[3] hidden md:flex items-center justify-center space-x-6 p-2">
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
        <section className="text-gray-700 hover:text-blue-500">
          ⚙️ <span className="md:text-lg hidden">Settings </span>
        </section>
        <section className="text-gray-700 hover:text-blue-500">
          ⚙️ <span className="md:text-lg hidden"> Notification</span>
        </section>
        <section className="text-gray-700 hover:text-blue-500">
          ⚙️ <span className="md:text-lg hidden">Help </span>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
