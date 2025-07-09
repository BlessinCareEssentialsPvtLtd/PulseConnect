import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = ({ doctorId }) => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [view, setView] = useState("pending");

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`/api/appointments/doctor/${doctorId}`);
      setPending(data.pending);
      setApproved(data.approved);
    } catch {
      toast.error("Failed to load appointments");
    }
  };

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

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("pending")}
          className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${
            view === "pending"
              ? "bg-yellow-500 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-yellow-100"
          }`}
        >
          Appointment Requests
        </button>
        <button
          onClick={() => setView("approved")}
          className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${
            view === "approved"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-blue-100"
          }`}
        >
          Approved Appointments
        </button>
      </div>

      {/* Content Area with fixed height and scroll */}
      <div className="max-h-[230px] overflow-y-auto space-y-4 pr-2">

        {/* Pending Section */}
        {view === "pending" && (
          <div>
            <h2 className="text-lg font-semibold mb-3">⏳ Appointment Requests</h2>
            {pending.length === 0 ? (
              <p className="text-sm text-gray-600">No pending requests.</p>
            ) : (
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
            )}
          </div>
        )}

        {/* Approved Section */}
        {view === "approved" && (
          <div>
            <h2 className="text-lg font-semibold mb-3">✅ Approved Appointments</h2>
            {approved.length === 0 ? (
              <p className="text-sm text-gray-600">No approved appointments.</p>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
