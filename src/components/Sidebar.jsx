// src/components/Sidebar.jsx
import {
  LayoutDashboard,
  Activity,
  FileText,
  CalendarCheck,
  Users,
  Dumbbell,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Activity, label: "Healthline" },
  { icon: FileText, label: "Records" },
  { icon: CalendarCheck, label: "Appointments" },
  { icon: Users, label: "Family" },
  { icon: Dumbbell, label: "Fitness" },
];

const Sidebar = ({ patient }) => {
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
              <p className="text-xs text-gray-500">Age: {calculateAge(patient?.dob || "2000-01-01")}</p>
              <p className="text-xs text-gray-500">Gender: {patient?.gender || "M"}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-3 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-100 text-gray-700 transition w-full"
              >
                <Icon size={18} className="text-blue-600" />
                <span>{label}</span>
              </button>
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
