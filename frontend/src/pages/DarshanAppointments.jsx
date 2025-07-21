import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import avatar from "../assets/user.jpg";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SuggestedTimes from '../components/SuggestedTimes';
import { useNavigate } from "react-router-dom";



export default function AppointmentSection() {
    const patient = JSON.parse(localStorage.getItem("patientData"));
    const today = new Date().toISOString().split("T")[0];
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/appointments")
            .then((res) => {
                const today = new Date().toISOString().split("T")[0];

                const updatedAppointments = res.data.map((appt) => {
                    if (appt.status === "Confirmed" && appt.date < today) {
                        return { ...appt, status: "Completed" };
                    }
                    return appt;
                });

                setAppointments(updatedAppointments);
            })
            .catch((err) => {
                console.error("Error fetching appointments:", err);
            });
    }, []);



    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    const [status, setStatus] = useState("All");
    const [showModal, setShowModal] = useState(true);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [newAppointment, setNewAppointment] = useState({
        patient: "",
        p_id: "",
        doctor: "",
        specialty: "",
        date: null,
        time: "",
        notes: "",
    });

    const generateId = () => "APT" + (appointments.length + 1).toString().padStart(3, "0");
    const generatePId = () => "PULSE" + (appointments.length + 1).toString().padStart(4, "0");

    // Doctor data
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");

    const formatDateLocal = (date) => {
        if (!(date instanceof Date)) return "";
        return date.toLocaleDateString('en-CA'); // yyyy-mm-dd
    };



    const handleAddAppointment = () => {
        const conflictExists = appointments.some(
            (a) =>
                a.date === newAppointment.date?.toISOString().split("T")[0] &&
                a.time === (newAppointment.time || "10:00 AM") &&
                a.doctor === newAppointment.doctor &&
                (!editingAppointment || a._id !== editingAppointment._id) // ✅ Fix here (_id)
        );

        if (conflictExists) {
            toast.error("This time slot is already booked for the doctor.");
            return;
        }

        const dateStr = formatDateLocal(newAppointment.date);
        const defaultTime = newAppointment.time || "10:00 AM";

        if (editingAppointment) {
            // ✅ Updating existing appointment
            const updatedAppointment = {
                ...editingAppointment,
                ...newAppointment,
                date: dateStr,
                time: defaultTime,
                status: "Pending", // ✅ Reset status
            };

            axios
                .put(`http://localhost:5000/api/appointments/${editingAppointment._id}`, updatedAppointment)
                .then((res) => {
                    toast.success("Appointment updated and sent for doctor approval.");

                    // ✅ Update locally
                    setAppointments((prev) =>
                        prev.map((a) =>
                            a._id === editingAppointment._id ? { ...res.data, patientAvatar: avatar } : a
                        )
                    );

                    setShowModal(false);
                    setEditingAppointment(null);
                    setNewAppointment({
                        patient: "",
                        p_id: "",
                        doctor: "",
                        specialty: "",
                        date: null,
                        time: "",
                        notes: "",
                    });
                })
                .catch((err) => {
                    toast.error("Error updating appointment.");
                    console.error("Error updating appointment:", err);
                });

        } else {
            // ✅ New appointment
            axios
                .post("http://localhost:5000/api/appointments", {
                    patient: newAppointment.patient,
                    p_id: generatePId(),
                    doctor: newAppointment.doctor,
                    specialty: newAppointment.specialty,
                    date: dateStr,
                    time: defaultTime,
                    notes: newAppointment.notes,
                    status: "Pending",
                    patientAvatar: avatar,
                })
                .then((res) => {
                    toast.success("Appointment added!");
                    setAppointments((prev) => [
                        ...prev,
                        { ...res.data, patientAvatar: avatar },
                    ]);
                    setShowModal(false);
                    setNewAppointment({
                        patient: "",
                        p_id: "",
                        doctor: "",
                        specialty: "",
                        date: null,
                        time: "",
                        notes: "",
                    });
                })
                .catch((err) => {
                    toast.error("Failed to add appointment");
                    console.error("Error adding appointment:", err);
                });
        }
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
        !filterDate || a.date === formatDateLocal(filterDate);

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
                        src={a.patientAvatar || avatar}
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
                    <div className="h-25 w-75 rounded-full"><span className="font-medium text-gray-500">📝 Notes:</span> {a.notes || "No notes available."}  </div>
                </div>

                {/* Right: Notes */}
                <div >
                    {(a.status === "Pending" || a.status === "Confirmed") && (
                        <button onClick={() => {
                            setShowModal(true);
                            setEditingAppointment(a);
                            setNewAppointment({ ...a, date: new Date(a.date) });
                        }} className="text-sm text-gray-700 max-w-sm">✏️</button>
                    )}
                </div>
            </div>



            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4  pt-4">
                {/* Time/Date Info */}
                <div className="flex flex-wrap items-center gap-30 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                        <h3 className="text-lg font-semibold">{a.patient}</h3>
                    </div>
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
        <div className="ml-[20vw] w-[80vw] px-4 py-6 overflow-y-auto">
            <div className="p-15 space-y-6 bg-gray-50 w-full max-w-7xl mx-auto overflow-x-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-bold">Appointments</h2>
                    <div className="flex flex-col md:flex-row gap-2 md:items-center w-full md:w-auto">
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search Doctor"
                                className="px-3 py-2 rounded border w-full sm:w-auto"
                                value={search}
                                onChange={async (e) => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    if (!value.trim()) {
                                        setResults([]); // Clear results if input is empty
                                        return;
                                    }
                                    try {
                                        const res = await axios.get(`http://localhost:5000/api/auth/doctors?search=${value}`);
                                        setResults(res.data);
                                    } catch {
                                        toast.error("Failed to search doctors");
                                    }
                                }}
                            />
                            {/* Show doctor search results only if there is a search term and results */}
                            {search.trim() && results.length > 0 && (
                                <div className="bg-white border rounded shadow p-2 absolute z-10 max-h-60 overflow-y-auto w-full sm:w-auto">
                                    {results.map((doctor) => (
                                        <div
                                            key={doctor._id}
                                            className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setNewAppointment((prev) => ({ ...prev, doctor: doctor.fullName })); // Set doctor in appointment
                                                setSearch(doctor.fullName); // Set search input to selected doctor
                                                setResults([]); // Clear results
                                            }}
                                        >
                                            {doctor.fullName}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                                    value={patient.fullName}
                                    onChange={(e) =>
                                        setNewAppointment({ ...newAppointment, patient: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {/* doctor input */}
                                <input
                                    type="text"
                                    placeholder="Doctor"
                                    value={newAppointment.doctor}
                                    onChange={(e) => {
                                        setNewAppointment({ ...newAppointment, doctor: e.target.value });
                                        setSelectedDoctor(e.target.value); // update selectedDoctor
                                    }}
                                    className="w-full px-3 py-2 border rounded"
                                />


                                {/* <input
                                    type="text"
                                    placeholder="Specialty"
                                    value={newAppointment.specialty}
                                    onChange={(e) =>
                                        setNewAppointment({ ...newAppointment, specialty: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                /> */}

                                <DatePicker
                                    selected={newAppointment.date}
                                    onChange={(date) => {
                                        setNewAppointment({ ...newAppointment, date });
                                        setSelectedDate(date); // update selectedDate
                                    }}
                                    placeholderText="Select Date"
                                    className="w-full px-3 py-2 border rounded"
                                />


                                <SuggestedTimes
                                    selectedDoctor={selectedDoctor}
                                    selectedDate={selectedDate}
                                    appointments={appointments}
                                    selectedTime={selectedTime} // ✅ highlight selected
                                    onSelect={(slot) => {
                                        setSelectedTime(slot);
                                        setNewAppointment({ ...newAppointment, time: slot });
                                    }}
                                />

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
        </div>
    );
}
