import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => (
  <div className="flex justify-between items-center px-2 mb-2">
    <button
      onClick={() => onNavigate("PREV")}
      className="p-2 rounded hover:bg-gray-200"
    >
      <ChevronLeft size={20} />
    </button>
    <h2 className="text-lg font-medium text-center">{label}</h2>
    <button
      onClick={() => onNavigate("NEXT")}
      className="p-2 rounded hover:bg-gray-200"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

const DoctorAppointments = ({ doctorId }) => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [view, setView] = useState("calendar");

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`/api/appointments/doctor/${doctorId}`);
      setPending(data.pending || []);
      setApproved(data.approved || []);
    } catch {
      toast.error("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const approve = async (id) => {
    try {
      await axios.put(`/api/appointments/${id}/approve`);
      toast.success("Appointment approved");
      fetchAppointments();
    } catch {
      toast.error("Approval failed");
    }
  };

  const reject = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      toast.success("Appointment rejected");
      fetchAppointments();
    } catch {
      toast.error("Rejection failed");
    }
  };

  const combinedEvents = [...pending, ...approved].map((appt) => ({
    title: appt.patientName,
    start: new Date(appt.date),
    end: new Date(new Date(appt.date).getTime() + 30 * 60000),
    desc: `Status: ${appt.status}`,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Toggle View Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("calendar")}
          className={`px-4 py-2 rounded font-semibold ${
            view === "calendar"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-blue-100"
          }`}
        >
          Calendar View
        </button>
        <button
          onClick={() => setView("pending")}
          className={`px-4 py-2 rounded font-semibold ${
            view === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-yellow-100"
          }`}
        >
          Pending Requests
        </button>
        <button
          onClick={() => setView("approved")}
          className={`px-4 py-2 rounded font-semibold ${
            view === "approved"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-green-100"
          }`}
        >
          Approved Appointments
        </button>
      </div>

      {/* View Area */}
      {view === "calendar" && (
  <div className="h-[260px] sm:h-[320px] overflow-hidden">
    <Calendar
      localizer={localizer}
      events={combinedEvents}
      startAccessor="start"
      endAccessor="end"
      defaultView="month"
      components={{ toolbar: CustomToolbar }}
      onSelectEvent={(event) =>
        alert(`${event.title}\n${event.desc}`)
      }
      style={{ height: "100%" }}
    />
  </div>
)}


      {view === "pending" && (
  <div className="h-[260px] sm:h-[320px] overflow-hidden">
    <h2 className="text-lg font-semibold mb-3">⏳ Pending Requests</h2>
    {pending.length === 0 ? (
      <p className="text-sm text-gray-600">No pending requests.</p>
    ) : (
      <div className="overflow-y-auto h-[210px] sm:h-[270px] pr-2">
        <ul className="space-y-3">
          {pending.map((a) => (
            <li
              key={a._id}
              className="flex items-center justify-between border-l-4 border-yellow-500 pl-4 pr-2 py-3 bg-yellow-50 rounded-md"
            >
              <div>
                <p className="font-semibold">{a.patientName}</p>
                <p className="text-sm text-gray-600">
                  {new Date(a.date).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => approve(a._id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => reject(a._id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}


      {view === "approved" && (
  <div className="h-[260px] sm:h-[320px] overflow-hidden">
    <h2 className="text-lg font-semibold mb-3">✅ Approved Appointments</h2>
    {approved.length === 0 ? (
      <p className="text-sm text-gray-600">No approved appointments.</p>
    ) : (
      <div className="overflow-y-auto h-[210px] sm:h-[270px] pr-2">
        <ul className="space-y-3">
          {approved.map((a) => (
            <li
              key={a._id}
              className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-md"
            >
              <p className="font-semibold">{a.patientName}</p>
              <p className="text-sm text-gray-600">
                {new Date(a.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default DoctorAppointments;
