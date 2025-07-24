import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const navLinks = [
    {
        name: "Dashboard", icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7m6 0v6m0 0H7m6 0h6" /></svg>
        )
    },
    {
        name: "Appointments", icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
        )
    },
    {
        name: "History", icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
        )
    },
];

const CurPatDash = () => {
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
            <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
                <div className="text-center p-8 bg-white rounded-xl shadow border border-red-100">
                    <div className="text-2xl font-bold text-red-600 mb-2">Patient data not found</div>
                    <div className="text-gray-600">Please login again.</div>
                </div>
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
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <div className="flex min-h-screen">
                <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 py-8 px-6">
                    <div className="mb-10 flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900">PulseConnect</span>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {navLinks.map(link => (
                            <button key={link.name} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                            </button>
                        ))}
                    </nav>
                </aside>
                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* Top Bar */}
                    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
                        <div className="flex items-center gap-4">
                            <img
                                src={patient.photo || "/default-avatar.png"}
                                alt="Patient Avatar"
                                className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                            />
                            <div>
                                <div className="text-lg font-semibold text-gray-900">{patient.fullName}</div>
                                <div className="text-xs text-gray-500">{patient.email}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">Patient ID: {patient.uniqueId}</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">DOB: {patient.dob}</span>
                        </div>
                    </header>

                    {/* Dashboard Grid */}
                    <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Access Requests */}
                        <section className="col-span-1 bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">Doctor Access Requests</h2>
                            {loadingRequests ? (
                                <div className="flex items-center gap-2 text-gray-400 animate-pulse">
                                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
                                    Loading requests...
                                </div>
                            ) : accessRequests.length === 0 ? (
                                <div className="text-gray-400 text-center py-6">No pending requests.</div>
                            ) : (
                                <ul className="space-y-3">
                                    {accessRequests.map((req) => {
                                        const doc = doctorInfos[req.doctorId];
                                        return (
                                            <li key={req._id} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">Doctor: {doc ? doc.fullName : req.doctorId}</span>
                                                        {doc && (
                                                            <>
                                                                <span className="text-xs text-gray-500">Email: {doc.email}</span>
                                                                <span className="text-xs text-gray-500">Specialization: {doc.specialization}</span>
                                                            </>
                                                        )}
                                                        <span className="text-xs text-gray-400">Requested: {new Date(req.createdAt).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => handleAction(req._id, "approved")}
                                                        className="bg-gray-900 hover:bg-gray-700 text-white px-3 py-1 rounded font-medium text-sm transition"
                                                    >
                                                        Allow
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req._id, "declined")}
                                                        className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium text-sm transition"
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                            {actionStatus && <div className="text-gray-700 mt-4 text-sm text-center">{actionStatus}</div>}
                        </section>

                        {/* Patient Info */}
                        <section className="col-span-1 flex flex-col gap-6">
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col items-center">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">Quick Stats</h3>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-gray-500">Gender:</span>
                                        <span className="font-medium text-gray-900">{patient.gender}</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-gray-500">Phone:</span>
                                        <span className="font-medium text-gray-900">{patient.phone}</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-gray-500">Username:</span>
                                        <span className="font-medium text-gray-900">{patient.userName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col items-center">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">Health Overview</h3>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-gray-500">Experience:</span>
                                        <span className="font-medium text-gray-900">{patient.experience || "-"}</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-gray-500">Location:</span>
                                        <span className="font-medium text-gray-900">{patient.place}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Timeline & Appointments */}
                        <section className="col-span-1 flex flex-col gap-6">
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col items-center">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">Timeline</h3>
                                <div className="w-full text-center text-gray-400 py-8">(Timeline component or data goes here)</div>
                            </div>
                            <div className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col items-center">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">Appointments</h3>
                                <div className="w-full text-center text-gray-400 py-8">(Appointments component or data goes here)</div>
                            </div>
                        </section>
                    </div>

                    {/* History Tiles Section */}
                    <section className="px-6 pb-8">
                        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 mt-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">History</h3>
                            <div className="w-full text-center text-gray-400 py-8">(HistoryTiles component or data goes here)</div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CurPatDash; 