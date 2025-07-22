import React, { useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import PatientOverview from "./PatientOverview";
import MedicalRecord from "./MedicalRecord";
import AppointmentHistory from "./AppointmentHistory";
import ContactMedicalInfo from "./ContactMedicalInfo";

const PatientOverlay = ({ setPatient, patient }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Medical Records", "Appointments", "Personal Info"];
  console.log(patient);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="bg-blue-800 text-white p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-blue-700 rounded-full transition-colors"
              onClick={() => setPatient(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <img
                src={patient.photo}
                alt=""
                className=" w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold">
                  {patient.fullName}
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  Patient ID: {patient.uniqueId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 sm:px-6 text-sm sm:text-base font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-800"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === "Overview" ? (
            <PatientOverview patient={patient} />
          ) : activeTab === "Medical Records" ? (
            <MedicalRecord />
          ) : activeTab === "Appointments" ? (
            <AppointmentHistory />
          ) : activeTab === "Personal Info" ? (
            <ContactMedicalInfo patient={patient} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PatientOverlay;
