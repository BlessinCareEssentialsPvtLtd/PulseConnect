// src/pages/AppointmentRequest.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



const AppointmentRequest = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [dateInputs, setDateInputs] = useState({});
  const patient = JSON.parse(localStorage.getItem("patientData"));

    if (!patient) {
        return <p className="text-red-500">Login required to request appointments</p>;
    }
  

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const res = await axios.get(`/api/auth/doctors?search=${search}`);
      setResults(res.data);
    } catch {
      toast.error("Failed to search doctors");
    }
  };

  const handleRequest = async (doctor) => {
  const date = dateInputs[doctor._id];
  if (!date) return toast.error("Please select a date");

  try {
    console.log("Patient from localStorage:", patient);
    await axios.post("http://localhost:5000/api/appointments/request", {
      doctorName: doctor.name,
      doctorId: doctor.uniqueId,
      patientId: patient._id,
      patientName: patient.name,
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
      <h2 className="text-2xl font-semibold mb-4">Search and Request Appointment</h2>

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((doc) => (
            <div key={doc._id} className="border p-4 rounded-md shadow-sm">
              <p className="font-semibold">{doc.name} ({doc.specialization})</p>
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
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
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
