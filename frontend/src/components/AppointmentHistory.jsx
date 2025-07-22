import React from "react";
import { Calendar, Clock, User } from "lucide-react";

const AppointmentHistory = () => {
  const appointments = [
    {
      id: 1,
      type: "Follow-up",
      description: "Hypertension follow-up",
      date: "2024-07-15",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      status: "Scheduled",
    },
    {
      id: 2,
      type: "Consultation",
      description: "Blood pressure check",
      date: "2024-06-15",
      time: "2:30 PM",
      doctor: "Dr. Smith",
      status: "Completed",
    },
    {
      id: 3,
      type: "Annual Checkup",
      description: "Routine health screening",
      date: "2024-05-20",
      time: "9:15 AM",
      doctor: "Dr. Smith",
      status: "Completed",
    },
  ];

  const getStatusStyles = (status) => {
    return status === "Scheduled"
      ? "bg-blue-100 text-blue-800 border border-blue-200"
      : "bg-green-100 text-green-800 border border-green-200";
  };

  return (
    <div className="w-full mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Appointment History
        </h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Calendar size={20} />
          Schedule New Appointment
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Calendar Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-800" />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {appointment.type}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {appointment.description}
                  </p>

                  {/* Date, Time, Doctor */}
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{appointment.doctor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHistory;