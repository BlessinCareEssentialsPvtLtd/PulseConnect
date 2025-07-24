import DashboardLayout from "../layout/DashboardLayout";
import PulseCard from "../components/PulseCard";
import Timeline from "../components/Timeline";
import Appointments from "../components/Appointments";
import HistoryTiles from "../components/HistoryTiles";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [accessRequests, setAccessRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [doctorInfos, setDoctorInfos] = useState({});

  useEffect(() => {
    if (user?.uniqueId) {
      fetchRequests();
    }
    // eslint-disable-next-line
  }, [user?.uniqueId]);

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const { data } = await axios.get(`/api/access/requests/${user.uniqueId}`);
      const pending = data.filter(r => r.status === "pending");
      setAccessRequests(pending);
      const infos = {};
      await Promise.all(pending.map(async (req) => {
        try {
          const { data: doc } = await axios.get(`/api/access/doctor/${req.doctorId}`);
          infos[req.doctorId] = doc;
        } catch {
          infos[req.doctorId] = { fullName: req.doctorId, email: "", specialization: "" };
        }
      }));
      setDoctorInfos(infos);
    } catch {
      setAccessRequests([]);
      setDoctorInfos({});
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleAction = async (requestId, status) => {
    setActionStatus("");
    try {
      await axios.put(`/api/access/requests/${requestId}`, { status, durationMinutes: 60 });
      setActionStatus(`Request ${status}`);
      fetchRequests();
    } catch {
      setActionStatus("Action failed");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-600">
        Patient data not found. Please login again.
      </div>
    );
  }

  const patient = {
    fullName: user.fullName,
    uniqueId: user.uniqueId,
    email: user.email,
    phone: user.phone,
    userName: user.username,
    dob: user.dob,
    gender: user.gender,
    place: `${user.address}, ${user.district}, ${user.state}, ${user.pinCode}`,
    photo: user.photo,
    experience: user.experience,
  };

  return (
    <>
      {/* Access Requests Section */}
      < div className="mb-6 rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-xl border border-gray-200" >
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Doctor Access Requests</h2>
        {
          loadingRequests ? (
            <div className="text-gray-500">Loading requests...</div>
          ) : accessRequests.length === 0 ? (
            <div className="text-gray-400">No pending requests.</div>
          ) : (
            <ul className="space-y-4">
              {accessRequests.map((req) => {
                const doc = doctorInfos[req.doctorId];
                return (
                  <li key={req._id} className="flex items-start justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div>
                      <div className="text-lg font-semibold text-slate-700">Dr. {doc ? doc.fullName : req.doctorId}</div>
                      {doc && (
                        <>
                          <div className="text-sm text-gray-500">Email: {doc.email}</div>
                          <div className="text-sm text-gray-500">Specialization: {doc.specialization}</div>
                        </>
                      )}
                      <div className="text-xs text-gray-400 mt-1">Requested on: {new Date(req.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleAction(req._id, "approved")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-md text-sm shadow"
                      >
                        Allow
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "declined")}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded-md text-sm shadow"
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )
        }
        {actionStatus && <div className="text-blue-600 mt-4 text-sm font-medium">{actionStatus}</div>}
      </div >

      {/* Main Dashboard */}
      < div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6" >
        <PulseCard />
        <Timeline />
        <Appointments />
        <HistoryTiles />
      </div >
    </>
  );
};

export default PatientDashboard;
