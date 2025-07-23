// src/pages/AppointmentRequest.jsx
import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";

const AppointmentRequest = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [dateInputs, setDateInputs] = useState({});
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-red-500">Login required to request appointments</p>
    );
  }

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const res = await api.get(`/auth/doctors?search=${search}`);
      setResults(res.data);
    } catch {
      toast.error("Failed to search doctors");
    }
  };

  const handleRequest = async (doctor) => {
    const date = dateInputs[doctor._id];
    if (!date) return toast.error("Please select a date");

    try {
      await api.post("/appointments/request", {
        doctorName: doctor.fullName,
        doctorId: doctor.uniqueId,
        patientId: user._id,
        patientName: user.fullName,
        date: date,
      });
      toast.success("Appointment requested!");
      setDateInputs((prev) => ({ ...prev, [doctor._id]: "" })); // clear input
    } catch (err) {
      console.error(err);
      toast.error("Failed to request appointment");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Search and Request Appointment
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search doctor by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </div>
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((doc) => (
            <div key={doc._id} className="border p-4 rounded-md shadow-sm">
              <p className="font-semibold">
                {doc.fullName} ({doc.specialization})
              </p>
              <p className="text-sm text-gray-600">{doc.place}</p>
              <div className="flex gap-2 mt-2">
                <input
                  type="datetime-local"
                  value={dateInputs[doc._id] || ""}
                  onChange={(e) =>
                    setDateInputs({ ...dateInputs, [doc._id]: e.target.value })
                  }
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => handleRequest(doc)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentRequest;
