// src/components/Navbar.jsx
import { Bell, Sun, AlertTriangle, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear local storage or any auth tokens if used
    // localStorage.clear(); or cookies etc.
    navigate("/login/patient"); // redirect to login
  };

  return (
    <header className="w-full h-16 bg-white flex items-center justify-between px-6 border-b shadow-sm">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search patient, report, etc..."
          className="bg-blue-50 pl-10 pr-4 py-2 rounded-full text-sm w-full border focus:ring-2 ring-blue-200 outline-none"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Right Icons & Logout */}
      <div className="flex items-center space-x-6">
        <AlertTriangle
          className="text-blue-700 hover:text-blue-900 cursor-pointer transition duration-200"
          title="Alerts"
        />
        <Bell
          className="text-blue-700 hover:text-blue-900 cursor-pointer transition duration-200"
          title="Notifications"
        />
        <Sun
          className="text-blue-700 hover:text-blue-900 cursor-pointer transition duration-200"
          title="Theme Switch"
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium transition duration-200"
        >
          <LogOut size={16} className="mr-1" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;