import React from "react";
import {
  UserCheck,
  AlertTriangle,
  CalendarPlus,
  FilePlus,
  Phone,
  Mail,
} from "lucide-react";

const PatientOverview = () => {
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
                <p className="text-base font-medium text-gray-900">34 years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Blood Type</p>
                <p className="text-base font-medium text-gray-900">A+</p>
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
                <p className="text-base font-medium text-gray-900">Female</p>
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

        {/* Recent Medical Records */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Medical Records
          </h2>

          <div className="space-y-4">
            {/* Record 1 */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Hypertension</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Prescribed Lisinopril 10mg daily
                </p>
                <p className="text-xs text-gray-500">Rx Dr. Smith</p>
              </div>
              <span className="text-xs text-gray-400">2024-06-15</span>
            </div>

            {/* Record 2 */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  Annual Checkup
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Routine blood work ordered
                </p>
                <p className="text-xs text-gray-500">Rx Dr. Smith</p>
              </div>
              <span className="text-xs text-gray-400">2024-05-20</span>
            </div>

            {/* Record 3 */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  Upper Respiratory Infection
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Prescribed Amoxicillin 500mg
                </p>
                <p className="text-xs text-gray-500">Rx Dr. Johnson</p>
              </div>
              <span className="text-xs text-gray-400">2024-03-10</span>
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