import React from "react";
import {
  UserCheck,
  AlertTriangle,
  CalendarPlus,
  FilePlus,
  Phone,
  Mail,
} from "lucide-react";

const PatientOverview = ({ patient }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Patient Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Patient Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserCheck className="w-5 h-5 text-blue-800" />
            <h2 className="text-lg font-semibold text-gray-900">
              Patient Summary
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Age</p>
                <p className="text-base font-medium text-gray-900">
                  {new Date().getFullYear() -
                    new Date(patient.dob).getFullYear()}{" "}
                  years
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Blood Type</p>
                <p className="text-base font-medium text-gray-900">
                  {patient.bloodGroup}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full border border-red-200">
                    <AlertTriangle className="w-3 h-3" />
                    Penicillin
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full border border-red-200">
                    <AlertTriangle className="w-3 h-3" />
                    Shellfish
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="text-base font-medium text-gray-900">
                  {patient.gender}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Visit</p>
                <p className="text-base font-medium text-gray-900">
                  2024-06-15
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Quick Actions */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <CalendarPlus className="w-4 h-4" />
              Schedule Appointment
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              <FilePlus className="w-4 h-4" />
              Add Medical Record
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              <Phone className="w-4 h-4" />
              Call Patient
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              <Mail className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;
