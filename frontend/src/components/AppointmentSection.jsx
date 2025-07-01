import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import avatar from "../assets/user.jpg";
import toast, { Toaster } from "react-hot-toast";


export default function AppointmentSection() {
  const today = new Date().toISOString().split("T")[0];

  const [appointments, setAppointments] = useState([
    {
      id: "APT001",
      patient: "John The Don",
      p_id : "PULSE0001" ,
      doctor: "Dr. Smith",
      specialty: "Cardiology",
      date: "2025-07-28",
      time: "4:00 PM",
      notes: "Follow-up ECG test",
      status: "Confirmed",
      patientAvatar: avatar,
    },
    {
      id: "APT002",
      patient: "Daku Mangal Singh",
      p_id : "PULSE0002" ,
      doctor: "Dr. Aisha",
      specialty: "Pediatrics",
      date: "2025-06-22",
      time: "10:30 AM",
      notes: "Fever & cough",
      status: "Completed",
      patientAvatar: avatar,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [status, setStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    p_id:"",
    doctor: "",
    specialty: "",
    date: null,
    time: "",
    notes: "",
  });

  const generateId = () => "APT" + (appointments.length + 1).toString().padStart(3, "0");
  const generatePId = () => "PULSE" + (appointments.length + 1).toString().padStart(4, "0");

  // const getSuggestedTimes = (patientName) => {
  //   const past = appointments.filter((a) => a.patient === patientName);
  //   const timeFrequency = {};
  //   past.forEach((a) => {
  //     if (!timeFrequency[a.time]) timeFrequency[a.time] = 0;
  //     timeFrequency[a.time]++;
  //   });
  //   const sorted = Object.entries(timeFrequency).sort((a, b) => b[1] - a[1]);
  //   return sorted.slice(0, 3).map((entry) => entry[0]);
  // };
  const getSuggestedTimes = (patientName, doctorName) => {
  const past = appointments.filter(
    (a) => a.patient === patientName || a.doctor === doctorName
  );
  const timeFrequency = {};
  past.forEach((a) => {
    if (!timeFrequency[a.time]) timeFrequency[a.time] = 0;
    timeFrequency[a.time]++;
  });
  const sorted = Object.entries(timeFrequency).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 3).map((entry) => entry[0]);
};


  const handleAddAppointment = () => {
    const conflictExists = appointments.some(
  (a) =>
    a.date === newAppointment.date?.toISOString().split("T")[0] &&
    a.time === (newAppointment.time || "10:00 AM") &&
    a.doctor === newAppointment.doctor &&
    (!editingAppointment || a.id !== editingAppointment.id)
);

if (conflictExists) {
  toast.error("This time slot is already booked for the doctor.");
  return;
}

    const dateStr = newAppointment.date?.toISOString().split("T")[0];
    const defaultTime = newAppointment.time || "10:00 AM";

    if (editingAppointment) {
      const updated = appointments.map((a) =>
        a.id === editingAppointment.id
          ? { ...editingAppointment, ...newAppointment, date: dateStr, time: defaultTime }
          : a
      );
      setAppointments(updated);
      setEditingAppointment(null);
    } else {
      setAppointments([
        ...appointments,
        {
          ...newAppointment,
          id: generateId(),
          p_id : generatePId(),
          date: dateStr,
          time: defaultTime,
          status: "Pending",
          patientAvatar: avatar,
        },
      ]);
    }

    setShowModal(false);
    setNewAppointment({
      patient: "",
      p_id:"",
      doctor: "",
      specialty: "",
      date: null,
      time: "",
      notes: "",
    });
  };

  const updateStatus = (id, newStatus) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAppointments(updated);
  };

  const matchesSearch = (a) =>
    a.patient.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor.toLowerCase().includes(search.toLowerCase());

  const matchesStatus = (a) =>
    status === "All" || a.status.toLowerCase() === status.toLowerCase();

  const matchesDate = (a) =>
    !filterDate || a.date === filterDate.toISOString().split("T")[0];

  const filtered = appointments.filter(
    (a) => matchesSearch(a) && matchesStatus(a) && matchesDate(a)
  );

  const sortByDate = (arr, asc = true) =>
    arr.sort((a, b) =>
      asc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );

  const upcoming = sortByDate(
  filtered.filter(
    (a) =>
      a.date >= today &&
      (a.status === "Confirmed" || a.status === "Pending")
  ),
  true
);

const past = sortByDate(
  filtered.filter(
    (a) =>
      a.date < today ||
      a.status === "Completed" ||
      a.status === "Rejected"
  ),
  false
);


const renderCard = (a) => (
  <div
    key={a.id}
    className="text-sm bg-white p-4 rounded-lg shadow w-full flex flex-col gap-4 border border-gray-200"
  >
    {/* Top Row */}
    <div className="flex flex-col md:flex-row justify-between gap-4">
      {/* Left: Patient name & status */}
      <div>
        <img
            src={a.patientAvatar}
            alt="patient"
            className="h-25 w-25 rounded-full"
          />
        
      </div>

      {/* Middle: Appointment metadata */}
      <div className="text-sm text-gray-700 space-y-2">
        <div><span className="font-medium text-gray-500">Patient ID:</span> {a.p_id}</div>
        <div><span className="font-medium text-gray-500">Doctor:</span> {a.doctor}</div>
        <div><span className="font-medium text-gray-500">Specialty:</span> {a.specialty}</div>
      </div>

      {/* Middle: Appointment metadata */}
      <div className="text-sm text-gray-700 space-y-2">
        <div><span className="font-medium text-gray-500">📝 Notes:</span> {a.notes || "No notes available."}  </div>
      </div>

      {/* Right: Notes */}
      <div className="text-sm text-gray-700 max-w-sm">
                 <div><span className="text-sm"></span> {a.id}</div>

      </div>
    </div>
    
    

    {/* Bottom Row */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4  pt-4">

       <h3 className="text-lg font-semibold">{a.patient}</h3>
     
        
      {/* Time/Date Info */}
      <div className="flex flex-wrap items-center gap-60 text-sm text-gray-700">
        <div className="flex items-center gap-1">
            <span>🕒</span>
            <span><strong>Time:</strong> {a.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span><strong>Date:</strong> {a.date}</span>
          </div>
      </div>

       {/* Confirmation */}
        <span className={`text-xs font-semibold mt-1 inline-block px-2 py-1 rounded-full
          ${a.status === "Confirmed" ? "bg-green-100 text-green-700" :
            a.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
            a.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}
        `}>
          {a.status}
        </span>
    </div>
  </div>
);


  return (
    <div className="p-15 space-y-6 bg-gray-50 w-full max-w-7xl mx-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <div className="flex flex-col md:flex-row gap-2 md:items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search patient or doctor"
            className="px-3 py-2 rounded border w-full sm:w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            placeholderText="Filter by date"
            className="px-3 py-2 border rounded"
          />
          <select
            className="px-3 py-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Rejected</option>
            <option>Completed</option>
          </select>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingAppointment(null);
            }}
            className="bg-blue-600 text-white px-3 py-2 rounded whitespace-nowrap"
          >
            + Schedule New
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
        <div className="flex flex-col gap-4">
          {upcoming.length ? upcoming.map(renderCard) : <p>No upcoming appointments.</p>}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Past Appointments</h3>
        <div className="flex flex-col gap-4">
          {past.length ? past.map(renderCard) : <p>No past appointments.</p>}
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center px-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h3 className="text-xl font-semibold mb-4">
        {editingAppointment ? "Edit Appointment" : "Schedule New Appointment"}
      </h3>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Patient Name"
          value={newAppointment.patient}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, patient: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Doctor"
          value={newAppointment.doctor}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, doctor: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Specialty"
          value={newAppointment.specialty}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, specialty: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />

        <DatePicker
          selected={newAppointment.date}
          onChange={(date) =>
            setNewAppointment({ ...newAppointment, date })
          }
          placeholderText="Select Date"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Time (e.g. 3:30 PM)"
          value={newAppointment.time}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, time: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />

        {newAppointment.patient && newAppointment.doctor && (
        <div className="text-sm text-gray-600">
          <p>Suggested Times:</p>
          <ul className="flex flex-wrap gap-2 mt-1">
            {getSuggestedTimes(newAppointment.patient, newAppointment.doctor).map((time) => (
              <li
                key={time}
                className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => setNewAppointment({ ...newAppointment, time })}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>
      )}


        <textarea
          placeholder="Notes"
          value={newAppointment.notes}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, notes: e.target.value })
          }
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => {
            setShowModal(false);
            setEditingAppointment(null);
          }}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleAddAppointment}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editingAppointment ? "Update" : "Add"}
        </button>
      </div>
    </div>
  </div>
)}
<>
  <Toaster />
  <div className="p-15 space-y-6 bg-gray-50 w-full max-w-7xl mx-auto overflow-x-hidden">
  </div>
</>
    </div>
  );
}
