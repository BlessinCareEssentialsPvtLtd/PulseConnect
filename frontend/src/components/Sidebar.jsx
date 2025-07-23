// src/components/Sidebar.jsx
import {
  LayoutDashboard,
  Activity,
  FileText,
  CalendarCheck,
  Users,
  Dumbbell,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard/patient" },
  { icon: Activity, label: "Healthline", to: "/healthline" },
  { icon: FileText, label: "Records", to: "/records" },
  { icon: CalendarCheck, label: "Appointments", to: "/dashboard/patient/appointments" },
  { icon: Users, label: "Family" },
  { icon: Dumbbell, label: "Fitness" },
];

const Sidebar = () => {
  const { user } = useAuth();
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[260px] bg-[#f0f8ff] text-gray-800 border-r flex-col justify-between h-full p-5 shadow-md">
        <div>
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-10">
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Patient"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-semibold">
                ?
              </div>
            )}
            <div className="flex flex-col">
              <h2 className="font-semibold text-base">{user?.fullName}</h2>
              <p className="text-xs text-gray-500">Age: {calculateAge(user?.dob)}</p>
              <p className="text-xs text-gray-500">Gender: {user?.gender}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map(({ icon: Icon, label, to }) => (
              <NavLink
                to={to}
                key={label}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded-md text-sm font-medium w-full ${isActive ? 'bg-blue-200 text-blue-700' : 'text-gray-700 hover:bg-blue-100'
                  }`
                }
              >
                <Icon size={18} className="text-blue-600" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} HealthCare
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 flex justify-around items-center py-2 px-4">
        {navItems.slice(0, 4).map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 transition"
          >
            <Icon size={20} />
            <span className="mt-1">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
