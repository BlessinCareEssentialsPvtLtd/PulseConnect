// PatientCard.tsx
import { Mail, Phone } from "lucide-react";
import React from "react";

const PatientCard = ({ patient, setSelectedPatient }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-2 rounded-lg shadow-sm w-full transition-all duration-200 hover:bg-gray-100">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <img
          src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover shadow-md object-top"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800">{patient.PatientName}</p>
          <p className="text-sm text-gray-500">
            {patient.Age} years • {patient.Gender}
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-x-2 flex-wrap">
            <span className="flex items-center gap-x-1">
              <Phone className="text-blue-800 h-4 w-4" />{" "}
              <span>{patient.Phone} •</span>{" "}
            </span>
            <span className="flex items-center gap-x-1">
              <Mail className="text-blue-800 h-4 w-4" />{" "}
              <span>{patient.Email}</span>
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 w-full md:w-auto">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            patient.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {patient.status}
        </span>
        <p className="text-xs text-gray-400 mt-1">
          Last visit: {patient.LastVisit}
        </p>
        <button
          className="mt-2 bg-blue-800 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-md"
          onClick={() => setSelectedPatient(patient)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
