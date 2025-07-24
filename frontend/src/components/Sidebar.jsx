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
  { icon: CalendarCheck, label: "Appointments", to: "/patient/appointments" },
  { icon: Users, label: "Family", to: "/family" },
  { icon: Dumbbell, label: "Fitness", to: "/fitness" },
];

const getInitials = (name) => {
  if (!name) return '?';
  const names = name.split(' ');
  return names.map((n) => n[0]).join('').toUpperCase();
};

const Sidebar = () => {
  const { user } = useAuth();
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return 'N/A';
    const diff = Date.now() - birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex w-[260px] bg-[#f0f8ff] text-gray-800 border-r flex-col justify-between h-full p-5 shadow-md"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <div>
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-10 p-3 rounded-lg bg-white/70 border border-blue-100 shadow-sm">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user?.fullName ? `Profile picture of ${user.fullName}` : "Patient profile"}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-white text-xl font-bold border-2 border-blue-400">
                {getInitials(user?.fullName)}
              </div>
            )}
            <div className="flex flex-col">
              <h2 className="font-semibold text-base">{user?.fullName || 'Patient'}</h2>
              <p className="text-xs text-gray-500">Age: {calculateAge(user?.dob)}</p>
              <p className="text-xs text-gray-500">Gender: {user?.gender || 'N/A'}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 mt-4" aria-label="Sidebar main links">
            {navItems.map(({ icon: Icon, label, to }) => (
              <NavLink
                to={to}
                key={label}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded-md text-sm font-medium w-full transition-colors duration-150 ${isActive
                    ? 'bg-blue-100 text-blue-700 shadow-inner border-l-4 border-blue-500'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`
                }
                aria-label={label}
              >
                <Icon size={18} className="text-blue-600" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6 flex flex-col items-center gap-1">
          <span>&copy; {new Date().getFullYear()} HealthCare</span>
          <span className="inline-block w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
            <LayoutDashboard size={16} className="text-blue-600" aria-hidden="true" />
          </span>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 w-full max-w-full overflow-x-hidden bg-white border-t shadow z-50 flex justify-around items-center py-2 px-2"
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        {navItems.slice(0, 4).map(({ icon: Icon, label, to }) => (
          <NavLink
            to={to}
            key={label}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs px-1 py-1 rounded-md transition font-medium min-w-0 max-w-full ${isActive ? 'text-blue-700 bg-blue-100' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`
            }
            aria-label={label}
          >
            <Icon size={20} aria-hidden="true" />
            <span className="mt-1 truncate max-w-[60px]">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
