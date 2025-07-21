import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import PatientData from "../dummydata/doctorDashboardPatientData.json";
import PatientCard from "../components/PatientCard";
import PatientOverlay from "../components/PatientOverlay";
import {
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Users,
} from "lucide-react";

const DoctorDashboard = () => {
  const location = useLocation();
  const [doctor, setDoctor] = useState(null);
  const [searchPatientData, setSearchPatientData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientOverlay, setShowPatientOverlay] = useState(false);

  useEffect(() => {
    const docData = location.state?.doctor;
    if (docData) {
      setDoctor(docData);
      localStorage.setItem("doctorData", JSON.stringify(docData));
    } else {
      const stored = localStorage.getItem("doctorData");
      if (stored) setDoctor(JSON.parse(stored));
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedPatient) {
      setShowPatientOverlay(true);
    } else {
      setShowPatientOverlay(false);
    }
  }, [selectedPatient]);

  // Debounced suggestion fetch
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchInput.length > 2) {
        fetchSuggestions(searchInput);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchInput]);

  const fetchSuggestions = async (input) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/patient/profile/uniqueId/" + input
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();

      setSuggestions(data);
      setShowSuggestions(true);
      console.log("Suggestions fetched:", data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleRequestAccess = (patientId) => {
    console.log("Requesting access for:", patientId);
    // TODO: implement backend API call
  };

  if (!doctor) {
    return (
      <div className="text-center mt-20 text-red-600">
        No doctor data found.
      </div>
    );
  }

  return (
    <DashboardLayout patient={doctor}>
      <div
        className="bg-[#F5F5F5] flex flex-col lg:flex-row p-4 my-2 gap-4 rounded-lg border border-gray-200 w-[95%] sm:w-[91%] lg:w-[98%] shadow-lg h-auto lg:h-[calc(100vh-90px)] overflow-hidden mx-auto"
        id="mainDashboard"
      >
        <div className="w-full h-auto lg:h-full flex flex-col gap-4">
          <div
            className="h-auto w-full bg-blue-800 text-white rounded-lg p-4 shadow-md flex flex-col items-center justify-between gap-5"
            id="welcomeDiv"
          >
            <div className="flex w-full items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold">
                Dr. {" " + "Jonathan Brooks"}👋
              </h2>
              <p className="text-xs md:text-sm hidden md:block">
                Here's your schedule for today.
              </p>
            </div>

            <div className="flex flex-col items-start justify-center gap-4 w-full relative">
              <div className="flex items-center gap-2 w-full sm:w-auto relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by UID, email, or name"
                  className="rounded-lg px-4 py-2 w-full sm:w-64 text-sm text-blue-800 font-bold
                    bg-gray-200 placeholder-blue-500 border border-white/30
                    shadow-sm focus:ring-2 focus:ring-white/70 focus:outline-none
                    transition duration-200"
                />

                {/* 🔍 Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-12 left-0 z-50 bg-white w-full sm:w-64 rounded-md shadow-lg mt-1 border border-blue-200 max-h-60 overflow-y-auto">
                    {suggestions.map((patient, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 flex flex-col gap-1 hover:bg-blue-50 border-b border-gray-100"
                      >
                        <div className="text-sm font-semibold text-blue-800">
                          {patient.fullName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {patient.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          UID: {patient.uniqueId}
                        </div>
                        <button
                          onClick={() => handleRequestAccess(patient.uniqueId)}
                          className="mt-1 px-2 py-1 text-xs bg-blue-800 text-white rounded hover:bg-blue-700 transition"
                        >
                          Request Access
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-wrap justify-around p-1 gap-1 h-fit sm:h-48 rounded-lg">
            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%] flex flex-col justify-between">
              <div className="text-sm text-blue-800 font-bold">
                Total Patients
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-2xl font-bold">3</div>
                <Users size={24} className="text-blue-800" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%] flex flex-col justify-between">
              <div className="text-sm text-blue-800 font-bold">
                Active Cases
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-2xl font-bold">3</div>
                <ClipboardList size={24} className="text-blue-800" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%] flex flex-col justify-between">
              <div className="text-sm text-blue-800 font-bold">
                Appointments Today
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-2xl font-bold">5</div>
                <CalendarCheck size={24} className="text-blue-800" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%] flex flex-col justify-between">
              <div className="text-sm text-blue-800 font-bold">
                Critical Cases
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-2xl font-bold">2</div>
                <AlertCircle size={24} className="text-blue-800" />
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div
            className="h-auto lg:h-[55%] w-full flex flex-col rounded-lg p-4 bg-white"
            id="patientList"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 h-auto gap-x-7">
              <h3 className="text-base md:text-lg font-bold flex items-center gap-0.5 md:gap-2 text-blue-800">
                Patient's List
                <span className="text-xs md:text-sm bg-blue-800 text-white rounded-full h-4 w-4 md:h-6 md:w-6 flex justify-center items-center">
                  <span>{PatientData.length}</span>
                </span>
              </h3>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Search patient"
                  className="rounded-lg px-4 py-2 w-full text-sm text-blue-800 font-bold
                    placeholder-blue-800 border border-blue-800/50
                    shadow-sm focus:ring-2 focus:border-blue-800/100 focus:outline-none
                    transition duration-200"
                />
                <button
                  className="rounded-lg px-4 py-2 bg-blue-800 text-white text-sm font-bold shadow-md hover:bg-blue-700 transition duration-200"
                  onClick={() => console.log("Search button clicked")}
                >
                  Search
                </button>
              </div>
              <div className="flex items-center gap-2 p-2 border border-blue-800 rounded-md mt-2 sm:mt-0">
                <CalendarDays size={20} className="text-blue-800" />
                <span className="text-xs md:text-sm font-medium text-blue-800">
                  14.10.2023
                </span>
              </div>
            </div>

            <div className="flex gap-4 h-auto lg:h-[85%]">
              <div className="w-full h-full flex flex-col gap-2 overflow-y-auto scrollbar_custom">
                {PatientData.length > 0 ? (
                  PatientData.map((patient, index) => (
                    <PatientCard
                      patient={patient}
                      key={index}
                      setSelectedPatient={setSelectedPatient}
                    />
                  ))
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-gray-500">No appointments today.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showPatientOverlay && selectedPatient && (
        <PatientOverlay
          patient={selectedPatient}
          onClose={() => {
            setSelectedPatient(null);
            setShowPatientOverlay(false);
          }}
          setPatient={setSelectedPatient}
        />
      )}
    </DashboardLayout>
  );
};

export default DoctorDashboard;
