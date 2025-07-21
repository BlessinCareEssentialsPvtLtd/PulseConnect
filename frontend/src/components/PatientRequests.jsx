import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientRequests = ({ doctor }) => {
    const [patientId, setPatientId] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [patientDetails, setPatientDetails] = useState(null);
    const [searchError, setSearchError] = useState("");
    const [searching, setSearching] = useState(false);
    const [approvedPatients, setApprovedPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch approved access patients for this doctor
        const fetchApproved = async () => {
            try {
                const { data } = await axios.get(`/api/access/approved-patients/${doctor.uniqueId}`);
                setApprovedPatients(data);
            } catch {
                setApprovedPatients([]);
            }
        };
        fetchApproved();
    }, [doctor.uniqueId]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setStatus("");
        setSearchError("");
        setPatientDetails(null);
        setSearching(true);
        try {
            // Use the new preview endpoint
            const { data } = await axios.get(`/api/access/search-patient/${patientId}`);
            setPatientDetails({
                uniqueId: data.uniqueId,
                fullName: data.fullName,
                email: data.email,
                gender: data.gender,
                dob: data.dob,
                phone: data.phone,
                address: `${data.address}, ${data.district}`,
            });
            // console.log(patientDetails);
        } catch (err) {
            setSearchError("Patient not found.");
        } finally {
            setSearching(false);
        }
    };

    const handleRequestAccess = async () => {
        setLoading(true);
        setStatus("");
        try {
            await axios.post("/api/access/request-access", {
                doctorId: doctor.uniqueId,
                patientId: patientDetails.uniqueId,
            });
            setStatus("Request sent successfully!");
        } catch (err) {
            setStatus(err.response?.data?.message || "Error sending request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
            <h1 className="text-2xl font-bold mb-4">Search Patient & Request Data Access</h1>
            <form onSubmit={handleSearch} className="flex flex-col gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Enter Patient Unique ID"
                    value={patientId}
                    onChange={e => setPatientId(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={searching}
                >
                    {searching ? "Searching..." : "Search"}
                </button>
            </form>
            {searchError && <div className="text-sm text-center text-red-700 mt-2">{searchError}</div>}
            {patientDetails && (
                <div className="bg-blue-50 p-4 rounded-lg shadow border border-blue-200 mb-4">
                    <h2 className="text-lg font-semibold text-blue-700 mb-2">Patient Details</h2>
                    <p><b>Name:</b> {patientDetails.fullName}</p>
                    <p><b>Email:</b> {patientDetails.email}</p>
                    <p><b>Gender:</b> {patientDetails.gender}</p>
                    <p><b>DOB:</b> {patientDetails.dob}</p>
                    <p><b>Phone:</b> {patientDetails.phone}</p>
                    <p><b>Address:</b> {patientDetails.address}</p>
                    <button
                        onClick={handleRequestAccess}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Requesting..." : "Request Access"}
                    </button>
                </div>
            )}
            {status && <div className="text-sm text-center text-blue-700 mt-2">{status}</div>}

            {/* Approved Patients List */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-2">Patients Ready for Diagnosis</h2>
                {approvedPatients.length === 0 ? (
                    <div className="text-gray-500">No patients with approved access.</div>
                ) : (
                    <ul className="space-y-3">
                        {approvedPatients.map((p) => (
                            <li key={p.uniqueId} className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-3">
                                <div>
                                    <div className="font-semibold">{p.fullName}</div>
                                    <div className="text-sm text-gray-600">Email: {p.email}</div>
                                    <div className="text-sm text-gray-600">Gender: {p.gender}</div>
                                    <div className="text-sm text-gray-600">DOB: {p.dob}</div>
                                    <div className="text-sm text-gray-600">Phone: {p.phone}</div>
                                    <div className="text-sm text-gray-600">Address: {p.address}, {p.district}</div>
                                </div>
                                <button
                                    onClick={() => navigate('/diagnose', { state: { doctorId: doctor.uniqueId, patientId: p.uniqueId } })}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Diagnose
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PatientRequests;