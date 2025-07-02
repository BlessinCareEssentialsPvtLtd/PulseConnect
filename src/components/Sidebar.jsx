// src/components/Sidebar.jsx
import {
  LayoutDashboard,
  Activity,
  FileText,
  CalendarCheck,
  Users,
  Dumbbell,
} from "lucide-react";

const Sidebar = ({ patient }) => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Activity, label: "Healthline" },
    { icon: FileText, label: "Medical Records" },
    { icon: CalendarCheck, label: "Appointment" },
    { icon: Users, label: "Family" },
    { icon: Dumbbell, label: "Fitness" },
  ];

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <aside className="w-[260px] bg-[#f0f8ff] text-gray-800 border-r hidden md:flex flex-col justify-between h-full p-5 shadow-md">
      <div>
        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-10">
          {patient?.photo ? (
            <img
              src={patient.photo}
              alt="Patient"
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-semibold">
              ?
            </div>
          )}
          <div className="flex flex-col">
            <h2 className="font-semibold text-base">{patient?.name || "John Doe"}</h2>
            <p className="text-xs text-gray-500">Age: {calculateAge(patient?.dob || "2000-01-01")} </p>
            <p className="text-xs text-gray-500">Gender: {patient.gender}</p>
            
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-3 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-100 text-gray-700 transition-all duration-200 w-full"
            >
              <Icon size={18} className="text-blue-600" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Optional Footer */}
      <div className="text-center text-xs text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} HealthCare
      </div>
    </aside>
  );
};

export default Sidebar;
