// src/components/Appointments.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { CalendarDays } from "lucide-react";
import AppointmentRequest from "../pages/AppointmentRequest"; // adjust if path differs
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("calendar");
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();
  const today = new Date().getDate();

  const fetchAppointments = async () => {
    try {
      if (!user?._id) return;
      const res = await api.get(`/appointments/patient/${user._id}`);
      setAppointments(res.data);
    } catch {
      toast.error("Failed to load appointments");
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAppointments();
  }, [user]);

  const pendingAppts = appointments.filter((a) => a.status === "pending");
  const approvedAppts = appointments.filter((a) => a.status === "approved");

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full h-[260] flex flex-col relative">
      {/* Floating Request Button */}
      <div className="absolute top-5 right-5 z-10">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm shadow cursor-pointer"
        >
          + Request Appointment
        </button>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setView("calendar")}
          className={`px-3 py-1 rounded text-sm ${view === "calendar"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-blue-100"
            }`}
        >
          📅 Calendar
        </button>
        <button
          onClick={() => setView("approved")}
          className={`px-3 py-1 rounded text-sm ${view === "approved"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-green-100"
            }`}
        >
          ✅ Approved
        </button>
        <button
          onClick={() => setView("pending")}
          className={`px-3 py-1 rounded text-sm ${view === "pending"
            ? "bg-yellow-500 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-yellow-100"
            }`}
        >
          ⏳ Pending
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <CalendarDays className="text-blue-600" />
          Appointments
        </h2>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* View Content */}
      <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300">
        {view === "calendar" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm font-medium text-blue-900">
                {new Date().toDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {appointments.length
                  ? `${appointments.length} appointments in total`
                  : "No appointments today"}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-700">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <span key={day} className="font-bold text-blue-700">
                      {day}
                    </span>
                  )
                )}
                {[...Array(31)].map((_, i) => {
                  const date = i + 1;
                  const isToday = date === today;
                  return (
                    <span
                      key={date}
                      className={`py-1 rounded-full ${isToday
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
        )}

        {view === "pending" && (
          <div>
            <h3 className="text-blue-600 font-medium text-sm mb-2">
              Pending Requests
            </h3>
            {pendingAppts.length === 0 ? (
              <p className="text-gray-600 text-sm">No pending appointments.</p>
            ) : (
              <ul className="space-y-2">
                {pendingAppts.map((appt) => (
                  <li
                    key={appt._id}
                    className="text-sm border-l-4 border-yellow-400 pl-3 py-1 bg-yellow-50 rounded"
                  >
                    <p>Dr. {appt.doctorName}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(appt.date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {view === "approved" && (
          <div>
            <h3 className="text-green-600 font-medium text-sm mb-2">
              Approved Appointments
            </h3>
            {approvedAppts.length === 0 ? (
              <p className="text-gray-600 text-sm">No approved appointments.</p>
            ) : (
              <ul className="space-y-2">
                {approvedAppts.map((appt) => (
                  <li
                    key={appt._id}
                    className="text-sm border-l-4 border-green-500 pl-3 py-1 bg-green-50 rounded"
                  >
                    <p>Dr. {appt.doctorName}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(appt.date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 ">Request Appointment</h2>
            <div className="max-h-[75vh] overflow-y-auto pr-2">
              <AppointmentRequest />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
