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
      // Fetch doctor info for each request
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
    <DashboardLayout patient={patient}>
      {/* Access Requests Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Doctor Access Requests</h2>
        {loadingRequests ? (
          <div className="text-gray-500">Loading requests...</div>
        ) : accessRequests.length === 0 ? (
          <div className="text-gray-500">No pending requests.</div>
        ) : (
          <ul className="space-y-3">
            {accessRequests.map((req) => {
              const doc = doctorInfos[req.doctorId];
              return (
                <li key={req._id} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded p-3">
                  <div>
                    <div className="font-semibold">Doctor: {doc ? doc.fullName : req.doctorId}</div>
                    {doc && (
                      <>
                        <div className="text-sm text-gray-600">Email: {doc.email}</div>
                        <div className="text-sm text-gray-600">Specialization: {doc.specialization}</div>
                      </>
                    )}
                    <div className="text-sm text-gray-600">Requested: {new Date(req.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(req._id, "approved")}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Allow
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "declined")}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Decline
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {actionStatus && <div className="text-blue-700 mt-2 text-sm">{actionStatus}</div>}
      </div>
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <PulseCard patient={patient} />
        <Timeline />
        <Appointments />
        <HistoryTiles />
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
