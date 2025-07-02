import { CalendarDays } from "lucide-react";

const Appointments = () => {
  const today = new Date().getDate();

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <CalendarDays className="text-blue-600" />
          Appointments
        </h2>
        <span className="text-sm text-gray-500">July 2025</span>
      </div>

      {/* Calendar + Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appointment Note */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm font-medium text-blue-900">July 1, 2025</p>
          <p className="text-xs text-gray-500 mt-1">No appointments on this day</p>
        </div>

        {/* Calendar Grid */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-700">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day} className="font-bold text-blue-700">
                {day}
              </span>
            ))}
            {[...Array(31)].map((_, i) => {
              const date = i + 1;
              const isToday = date === today;
              return (
                <span
                  key={date}
                  className={`py-1 rounded-full ${
                    isToday
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-blue-100 cursor-pointer"
                  }`}
                >
                  {date}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
