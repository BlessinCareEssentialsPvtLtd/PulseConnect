import {
    CalendarDays,
    ClipboardPlus,
    MoveUpRight,
    QrCode,
    ScanLine,
    Users, // Import for Total Patients
    ClipboardList, // Import for Active Cases
    CalendarCheck, // Import for Appointments Today
    AlertCircle, // Import for Critical Cases (or similar like BellDot, CircleAlert)
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PatientData from "../dummydata/doctorDashboardPatientData.json";
import "../App.css";
// import Layout from "../components/Layout";
import Calendar from "react-calendar";
import PatientCard from "../components/PatientCard";
import PatientOverlay from "../components/PatientOverlay";
import DashboardLayout from "../layout/DashboardLayout";
import PatientRequests from "../components/PatientRequests";

const DoctorDashboard2 = () => {
    const location = useLocation();
    const [doctor, setDoctor] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showPatientOverlay, setShowPatientOverlay] = useState(false);

    // Fixed useEffect instead of useState for side effect
    useEffect(() => {
        if (selectedPatient) {
            setShowPatientOverlay(true);
        } else {
            setShowPatientOverlay(false);
        }
    }, [selectedPatient]);

    //   for Doctor data

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
    console.log(doctor);

    return (
        <>
          
                {/* <div className=" w-full h-[70px]" id="navbarPlaceholder"></div> */}
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
                                {doctor && (
                                    <h2 className="text-lg md:text-xl font-bold">
                                        Dr. {doctor.fullName} 👋
                                    </h2>
                                )}


                                {/* <div>
                                    <PatientRequests doctor={doctor} />
                                </div> */}
                            </div>
                            <div className="flex flex-col items-start justify-center gap-4 w-full">
                                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            className="rounded-lg px-4 py-2 w-full sm:w-48 text-sm text-blue-800 font-bold
                                  bg-gray-200 placeholder-blue-500 border border-white/30
                                  shadow-sm focus:ring-2 focus:ring-white/70 focus:outline-none
                                  transition duration-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Adjusted sizes for the four statistic cards */}
                        <div className="flex flex-wrap justify-around p-1 gap-1 h-fit sm:h-48 rounded-lg">
                            {/* Total Patients Card */}
                            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%]  flex flex-col justify-between">
                                <div className="text-sm text-blue-800 font-bold">
                                    Total Patients
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="text-2xl font-bold ">3</div>
                                    <Users size={24} className="text-blue-800" />
                                </div>
                            </div>

                            {/* Active Cases Card */}
                            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%]  flex flex-col justify-between">
                                <div className="text-sm text-blue-800 font-bold">
                                    Active Cases
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="text-2xl font-bold">3</div>
                                    <ClipboardList size={24} className="text-blue-800" />
                                </div>
                            </div>

                            {/* Appointments Today Card */}
                            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%]  flex flex-col justify-between">
                                <div className="text-sm text-blue-800 font-bold">
                                    Appointments Today
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="text-2xl font-bold">5</div>
                                    <CalendarCheck size={24} className="text-blue-800" />
                                </div>
                            </div>

                            {/* Critical Cases Card */}
                            <div className="bg-white rounded-lg p-3 text-left w-full sm:w-[24%] flex flex-col justify-between">
                                <div className="text-sm text-blue-800 font-bold">
                                    Critical Cases
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="text-2xl font-bold">2</div>
                                    <AlertCircle size={24} className="text-blue-800" />{" "}
                                    {/* Changed to red for critical */}
                                </div>
                            </div>
                        </div>
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

                {/* Patient Overlay - moved outside the main container */}
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
                
        </>
    );
};

export default DoctorDashboard2;